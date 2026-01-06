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
    width: 250,
    height: 250,
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
    // 优化：在图像加载前预加载资源
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = `https:${image}`;
    preloadLink.fetchpriority = 'high';
    document.head.appendChild(preloadLink);
    
    // 预加载优化后的图像格式
    const optimizedUrl = new URL(image, window.location);
    optimizedUrl.searchParams.set('format', 'webply');
    optimizedUrl.searchParams.set('optimize', 'medium');
    optimizedUrl.searchParams.set('width', '800');
    
    const optimizedPreload = document.createElement('link');
    optimizedPreload.rel = 'preload';
    optimizedPreload.as = 'image';
    optimizedPreload.href = optimizedUrl.toString();
    optimizedPreload.fetchpriority = 'high';
    document.head.appendChild(optimizedPreload);

    // 渲染图像组件
    await UI.render(Image, {
      src: image,
      ...IMAGES_SIZES,
      params: {
        ...IMAGES_SIZES.mobile,
        ...IMAGES_SIZES.desktop
      },
      loading: 'eager', // 对于LCP图像使用eager
      fetchpriority: 'high',
      isDiscoverable: true
    })(document.createElement('div'));
    // await UI.render(Image, {
    //   src: image,
    //   ...IMAGES_SIZES,
    //   params: {
    //     ...IMAGES_SIZES.mobile,
    //     ...IMAGES_SIZES.desktop
    //   },
    //   loading: 'lazy',
    //   fetchpriority: 'high',
    //   isDiscoverable: true
    // })(document.createElement('div'));
  }
  return data;
}
