/* eslint-disable import/no-unresolved */

import {
  InLineAlert,
  Icon,
  Button,
  Image,
  provider as UI,
} from '@dropins/tools/components.js';
import { events } from '@dropins/tools/event-bus.js';
import * as pdpApi from '@dropins/storefront-pdp/api.js';
import { render as pdpRendered } from '@dropins/storefront-pdp/render.js';

// Containers
import ProductHeader from '@dropins/storefront-pdp/containers/ProductHeader.js';
import ProductPrice from '@dropins/storefront-pdp/containers/ProductPrice.js';
import ProductShortDescription from '@dropins/storefront-pdp/containers/ProductShortDescription.js';
import ProductOptions from '@dropins/storefront-pdp/containers/ProductOptions.js';
import ProductQuantity from '@dropins/storefront-pdp/containers/ProductQuantity.js';
import ProductDescription from '@dropins/storefront-pdp/containers/ProductDescription.js';
import ProductAttributes from '@dropins/storefront-pdp/containers/ProductAttributes.js';
import ProductGallery from '@dropins/storefront-pdp/containers/ProductGallery.js';

// Libs
import { setJsonLd } from '../../scripts/commerce.js';
import { fetchPlaceholders } from '../../scripts/aem.js';

// Initializers
import { IMAGES_SIZES } from '../../scripts/initializers/pdp.js';
import '../../scripts/initializers/cart.js';

// Preload LCP image
function preloadLcpImage(product) {
  if (!product?.images?.length) return;
  
  const lcpImage = product.images[0].url;
  if (!lcpImage) return;

  // 检查是否已经预加载了相同的图像
  const existingPreload = Array.from(document.head.querySelectorAll('link[rel="preload"][as="image"]'))
    .find(link => link.href === lcpImage);
    
  if (existingPreload) {
    return; // 如果已经预加载则不再重复
  }

  // 使用更直接的方式预加载关键图像
  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preload';
  preloadLink.as = 'image';
  preloadLink.href = lcpImage;
  preloadLink.fetchpriority = 'high';
  document.head.appendChild(preloadLink);

  // 同时预加载优化后的图像格式
  const optimizedImageUrl = new URL(lcpImage, window.location);
  optimizedImageUrl.searchParams.set('format', 'webply');
  optimizedImageUrl.searchParams.set('optimize', 'medium');
  
  const optimizedPreload = document.createElement('link');
  optimizedPreload.rel = 'preload';
  optimizedPreload.as = 'image';
  optimizedPreload.href = optimizedImageUrl.toString();
  optimizedPreload.fetchpriority = 'high';
  document.head.appendChild(optimizedPreload);
}

export default async function decorate(block) {
  // eslint-disable-next-line no-underscore-dangle
  const product = events._lastEvent?.['pdp/data']?.payload ?? null;
  const labels = await fetchPlaceholders();

  // 预加载LCP图像
  preloadLcpImage(product);

  // 布局
  const fragment = document.createRange().createContextualFragment(`
    <div class="product-details__wrapper">
      <div class="product-details__alert"></div>
      <div class="product-details__left-column">
        <div class="product-details__gallery"></div>
      </div>
      <div class="product-details__right-column">
        <div class="product-details__header"></div>
        <div class="product-details__price"></div>
        <div class="product-details__gallery"></div>
        <div class="product-details__short-description"></div>
        <div class="product-details__configuration">
          <div class="product-details__options"></div>
          <div class="product-details__quantity"></div>
          <div class="product-details__buttons">
            <div class="product-details__buttons__add-to-cart"></div>
            <div class="product-details__buttons__add-to-wishlist"></div>
          </div>
        </div>
        <div class="product-details__description"></div>
        <div class="product-details__attributes"></div>
      </div>
    </div>
  `);

  const $alert = fragment.querySelector('.product-details__alert');
  const $gallery = fragment.querySelector('.product-details__gallery');
  const $header = fragment.querySelector('.product-details__header');
  const $price = fragment.querySelector('.product-details__price');
  const $galleryMobile = fragment.querySelector('.product-details__right-column .product-details__gallery');
  const $shortDescription = fragment.querySelector('.product-details__short-description');
  const $options = fragment.querySelector('.product-details__options');
  const $quantity = fragment.querySelector('.product-details__quantity');
  const $addToCart = fragment.querySelector('.product-details__buttons__add-to-cart');
  const $addToWishlist = fragment.querySelector('.product-details__buttons__add-to-wishlist');
  const $description = fragment.querySelector('.product-details__description');
  const $attributes = fragment.querySelector('.product-details__attributes');

  block.appendChild(fragment);

  // Alert
  let inlineAlert = null;

  // Render Containers
  const [
    _galleryMobile,
    _gallery,
    _header,
    _price,
    _shortDescription,
    _options,
    _quantity,
    addToCart,
    addToWishlist,
    _description,
    _attributes,
  ] = await Promise.all([
    // Gallery (Mobile)
    $galleryMobile ? pdpRendered(ProductGallery, {
      controls: 'dots', 
      arrows: true,
      fetchpriority: 'high', // 设置高获取优先级
      loading: 'eager',      // 立即加载
    })($galleryMobile) : Promise.resolve(null),

    // Gallery (Desktop)
    $gallery ? pdpRendered(ProductGallery, {
      controls: 'dots',
      arrows: true,
      fetchpriority: 'high', // 设置高获取优先级
      loading: 'eager',      // 立即加载
    })($gallery) : Promise.resolve(null),

    // Header
    $header ? pdpRendered(ProductHeader, { 
      fetchpriority: 'high',
      loading: 'eager'
    })($header) : Promise.resolve(null),

    // Price
    $price ? pdpRendered(ProductPrice, { 
      fetchpriority: 'high',
      loading: 'eager'
    })($price) : Promise.resolve(null),

    // Short Description
    $shortDescription ? pdpRendered(ProductShortDescription, { 
      fetchpriority: 'high',
      loading: 'eager'
    })($shortDescription) : Promise.resolve(null),

    // Options
    $options ? pdpRendered(ProductOptions, { 
      fetchpriority: 'high',
      loading: 'eager'
    })($options) : Promise.resolve(null),

    // Quantity
    $quantity ? pdpRendered(ProductQuantity, { 
      fetchpriority: 'high',
      loading: 'eager'
    })($quantity) : Promise.resolve(null),

    // Add to Cart Button
    $addToCart ? pdpRendered(Button, {
      variant: 'primary',
      placeholder: labels['add-to-cart'],
      type: 'submit',
    })($addToCart) : Promise.resolve(null),

    // Add to Wishlist Button
    $addToWishlist ? pdpRendered(Button, {
      variant: 'secondary',
      placeholder: labels['add-to-wishlist'],
      type: 'button',
    })($addToWishlist) : Promise.resolve(null),

    // Description
    $description ? pdpRendered(ProductDescription, { 
      fetchpriority: 'high',
      loading: 'eager'
    })($description) : Promise.resolve(null),

    // Attributes
    $attributes ? pdpRendered(ProductAttributes, { 
      fetchpriority: 'high',
      loading: 'eager'
    })($attributes) : Promise.resolve(null),
  ]);

  // Inline Alert
  if ($alert) {
    inlineAlert = await UI.render(InLineAlert, {
      status: 'neutral',
      icon: Icon,
      closeable: false,
    })($alert);
  }

  // Add to Cart Action
  const $form = $addToCart?.closest('form');
  if ($form) {
    $form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const selectedOptions = new URLSearchParams(
        new FormData($form).entries(),
      ).toString();

      try {
        // Add to Cart
        const { errors } = await pdpApi.mutations.addProductToCart({
          sku: product.sku,
          quantity: 1,
          selected_options: selectedOptions ? selectedOptions.split('&') : [],
        });

        // Show error if any
        if (errors?.length) {
          await inlineAlert?.show({ title: errors[0].message });
        }
      } catch (error) {
        await inlineAlert?.show({ title: error.message });
      }
    });
  }

  // Add JSON-LD
  setJsonLd({ ...product, description: product.shortDescription }, 'product');
}

async function setJsonLdProduct(product) {
  const {
    name,
    inStock,
    description,
    sku,
    urlKey,
    price,
    priceRange,
    images,
    attributes,
  } = product;
  const amount = priceRange?.minimum?.final?.amount || price?.final?.amount;
  const brand = attributes.find((attr) => attr.name === 'brand');

  // get variants
  const { data } = await pdpApi.fetchGraphQl(`
    query GET_PRODUCT_VARIANTS($sku: String!) {
      variants(sku: $sku) {
        variants {
          product {
            sku
            name
            inStock
            images(roles: ["image"]) {
              url
            }
            ...on SimpleProductView {
              price {
                final { amount { currency value } }
              }
            }
          }
        }
      }
    }
  `, {
    method: 'GET',
    variables: { sku },
  });

  const variants = data?.variants?.variants || [];

  const ldJson = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    name,
    description,
    image: images[0]?.url,
    offers: [],
    productID: sku,
    brand: {
      '@type': 'Brand',
      name: brand?.value,
    },
    url: new URL(`/products/${urlKey}/${sku}`, window.location),
    sku,
    '@id': new URL(`/products/${urlKey}/${sku}`, window.location),
  };

  if (variants.length > 1) {
    ldJson.offers.push(...variants.map((variant) => ({
      '@type': 'Offer',
      name: variant.product.name,
      image: variant.product.images[0]?.url,
      price: variant.product.price.final.amount.value,
      priceCurrency: variant.product.price.final.amount.currency,
      availability: variant.product.inStock ? 'http://schema.org/InStock' : 'http://schema.org/OutOfStock',
      sku: variant.product.sku,
    })));
  } else {
    ldJson.offers.push({
      '@type': 'Offer',
      price: amount?.value,
      priceCurrency: amount?.currency,
      availability: inStock ? 'http://schema.org/InStock' : 'http://schema.org/OutOfStock',
    });
  }

  setJsonLd(ldJson, 'product');
}

function createMetaTag(property, content, type) {
  if (!property || !type) {
    return;
  }
  let meta = document.head.querySelector(`meta[${type}="${property}"]`);
  if (meta) {
    if (!content) {
      meta.remove();
      return;
    }
    meta.setAttribute(type, property);
    meta.setAttribute('content', content);
    return;
  }
  if (!content) {
    return;
  }
  meta = document.createElement('meta');
  meta.setAttribute(type, property);
  meta.setAttribute('content', content);
  document.head.appendChild(meta);
}

function setMetaTags(product) {
  if (!product) {
    return;
  }

  const price = product.prices.final.minimumAmount ?? product.prices.final.amount;

  createMetaTag('title', product.metaTitle || product.name, 'name');
  createMetaTag('description', product.metaDescription, 'name');
  createMetaTag('keywords', product.metaKeyword, 'name');

  createMetaTag('og:type', 'product', 'property');
  createMetaTag('og:description', product.shortDescription, 'property');
  createMetaTag('og:title', product.metaTitle || product.name, 'property');
  createMetaTag('og:url', window.location.href, 'property');
  const mainImage = product?.images?.filter((image) => image.roles.includes('thumbnail'))[0];
  const metaImage = mainImage?.url || product?.images[0]?.url;
  createMetaTag('og:image', metaImage, 'property');
  createMetaTag('og:image:secure_url', metaImage, 'property');
  createMetaTag('product:price:amount', price.value, 'property');
  createMetaTag('product:price:currency', price.currency, 'property');
}
