/* eslint-disable import/prefer-default-export */
/* eslint import/no-cycle: [2, { maxDepth: 1 }] */

import { initializers } from '@dropins/tools/initializer.js';
import { Image, provider as UI } from '@dropins/tools/components.js';
import {
  initialize,
  setEndpoint,
  setFetchGraphQlHeaders,
  fetchProductData,
} from '@dropins/storefront-pdp/api.js';
import { initializeDropin } from './index.js';
import {
  commerceEndpointWithQueryParams,
  getOptionsUIDsFromUrl,
  getSkuFromUrl,
  loadErrorPage,
} from '../commerce.js';
import { getHeaders } from '../configs.js';
import { fetchPlaceholders } from '../aem.js';

export const IMAGES_SIZES = {
  width: 450,
  height: 450,
  mobile: {
    width: 300,
    height: 300,
  },
  desktop: {
    width: 450,
    height: 450,
  }
};

await initializeDropin(async () => {
  // Set Fetch Endpoint (Service)
  setEndpoint(await commerceEndpointWithQueryParams());

  // Set Fetch Headers (Service)
  setFetchGraphQlHeaders({
    ...(await getHeaders('cs')),
    'Content-Type': 'application/json',
  });

  const sku = getSkuFromUrl();
  const optionsUIDs = getOptionsUIDsFromUrl();

  // Preload first product image before fetching other data
  const [product, labels] = await Promise.all([
    fetchProductData(sku, { optionsUIDs, skipTransform: true }).then(preloadImageMiddleware),
    fetchPlaceholders(),
  ]);

  if (!product?.sku) {
    return loadErrorPage();
  }

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  const models = {
    ProductDetails: {
      initialData: { ...product },
    },
  };

  // Initialize Dropins
  return initializers.mountImmediately(initialize, {
    sku,
    optionsUIDs,
    langDefinitions,
    models,
    acdl: true,
    persistURLParams: true,
  });
})();

async function preloadImageMiddleware(data) {
  const image = data?.images?.[0]?.url?.replace(/^https?:/, '');

  if (image) {
    // Add preload link to head for critical first image
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = image;
    preloadLink.imageSrcset = `${image}?width=${IMAGES_SIZES.mobile.width}&height=${IMAGES_SIZES.mobile.height} 300w, ${image}?width=${IMAGES_SIZES.desktop.width}&height=${IMAGES_SIZES.desktop.height} 450w`;
    preloadLink.imageSizes = '(max-width: 767px) 300px, 450px';
    document.head.appendChild(preloadLink);

    // Render image with optimized parameters
    await UI.render(Image, {
      src: image,
      ...IMAGES_SIZES,
      params: {
        ...IMAGES_SIZES.mobile,
        ...IMAGES_SIZES.desktop,
        format: 'webp', // Use modern image format
        quality: 85 // Optimize quality vs size
      },
      loading: 'eager',
      fetchpriority: 'high',
      decoding: 'async',
      sizes: '(max-width: 767px) 300px, 450px',
    })(document.createElement('div'));
  }
  return data;
}
