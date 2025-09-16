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
  const header = document.querySelector('header');
  if (!header || !lcpImage) return;

  const preloadContainer = document.createElement('div');
  preloadContainer.style.display = 'none';
  header.appendChild(preloadContainer);

  UI.render(Image, {
    src: lcpImage,
    ...IMAGES_SIZES,
    params: {
      ...IMAGES_SIZES.mobile
    },
    loading: 'eager',
    format: 'auto',
    fetchpriority: 'high',
    isDiscoverable: true
  })(preloadContainer);
}

export default async function decorate(block) {
  // eslint-disable-next-line no-underscore-dangle
  const product = events._lastEvent?.['pdp/data']?.payload ?? null;
  const labels = await fetchPlaceholders();

  // Preload LCP image in header
  preloadLcpImage(product);

  // Layout
  const fragment = document.createRange().createContextualFragment(`
    <div class="product-details__wrapper">
      <div class="product-details__alert"></div>
      <div class="product-details__left-column">
        <div class="product-details__gallery gary-test2 dropin-design"><div isdiscoverable="true"><div role="region" aria-roledescription="Carousel" class="pdp-carousel pdp-carousel--main-image-controls pdp-carousel--thumbnailsColumn" style="--flex-carousel: row-reverse; --gap: 0; --width: 100%;"><div tabindex="0" class="pdp-carousel__wrapper pdp-carousel__wrapper--horizontal pdp-carousel__wrapper--peak" style="--total-width: 81.6%; --height: auto; --gap: var(--spacing-small); --per-page: 1; scroll-behavior: auto;"><div role="group" aria-roledescription="Slide" data-index="0" class="pdp-carousel__slide pdp-carousel__slide--horizontal pdp-carousel__slide--active" style="--length: 1;"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 1 of 7" width="250" height="250" loading="eager" src="//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png" srcset="//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=100&amp;height=250 768w,
//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=133.33333333333334&amp;height=250 1024w,
//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=177.86458333333334&amp;height=250 1366w,
//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=250&amp;height=250 1920w" class="dropin-image dropin-image--loaded"></div><div role="group" aria-roledescription="Slide" data-index="1" class="pdp-carousel__slide pdp-carousel__slide--horizontal" style="--length: 1;"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 2 of 7" width="250" height="250" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png" srcset="//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=100&amp;height=250 768w,
//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=133.33333333333334&amp;height=250 1024w,
//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=177.86458333333334&amp;height=250 1366w,
//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=250&amp;height=250 1920w" class="dropin-image dropin-image--loaded"></div><div role="group" aria-roledescription="Slide" data-index="2" class="pdp-carousel__slide pdp-carousel__slide--horizontal" style="--length: 1;"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 3 of 7" width="250" height="250" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png" srcset="//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=100&amp;height=250 768w,
//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=133.33333333333334&amp;height=250 1024w,
//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=177.86458333333334&amp;height=250 1366w,
//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=250&amp;height=250 1920w" class="dropin-image dropin-image--loaded"></div><div role="group" aria-roledescription="Slide" data-index="3" class="pdp-carousel__slide pdp-carousel__slide--horizontal" style="--length: 1;"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 4 of 7" width="250" height="250" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png" srcset="//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=100&amp;height=250 768w,
//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=133.33333333333334&amp;height=250 1024w,
//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=177.86458333333334&amp;height=250 1366w,
//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=250&amp;height=250 1920w" class="dropin-image"></div><div role="group" aria-roledescription="Slide" data-index="4" class="pdp-carousel__slide pdp-carousel__slide--horizontal" style="--length: 1;"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 5 of 7" width="250" height="250" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png" srcset="//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=100&amp;height=250 768w,
//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=133.33333333333334&amp;height=250 1024w,
//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=177.86458333333334&amp;height=250 1366w,
//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=250&amp;height=250 1920w" class="dropin-image"></div><div role="group" aria-roledescription="Slide" data-index="5" class="pdp-carousel__slide pdp-carousel__slide--horizontal" style="--length: 1;"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 6 of 7" width="250" height="250" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png" srcset="//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=100&amp;height=250 768w,
//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=133.33333333333334&amp;height=250 1024w,
//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=177.86458333333334&amp;height=250 1366w,
//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=250&amp;height=250 1920w" class="dropin-image"></div><div role="group" aria-roledescription="Slide" data-index="6" class="pdp-carousel__slide pdp-carousel__slide--horizontal" style="--length: 1;"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 7 of 7" width="250" height="250" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png" srcset="//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=100&amp;height=250 768w,
//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=133.33333333333334&amp;height=250 1024w,
//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=177.86458333333334&amp;height=250 1366w,
//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=250&amp;height=250 1920w" class="dropin-image"></div></div><button role="button" aria-label="Previous" disabled="" class="dropin-button dropin-button--medium dropin-button--tertiary dropin-button--tertiary--disabled pdp-carousel__button pdp-carousel__button--prev" style="--height: 439px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="dropin-icon dropin-icon--shape-stroke-2 pdp-carousel__button__icon pdp-carousel__button__icon--prev"><path d="M7.74512 9.87701L12.0001 14.132L16.2551 9.87701" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path></svg></button><button role="button" aria-label="Next" class="dropin-button dropin-button--medium dropin-button--tertiary pdp-carousel__button pdp-carousel__button--next" style="--height: 439px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="dropin-icon dropin-icon--shape-stroke-2 pdp-carousel__button__icon pdp-carousel__button__icon--next"><path d="M7.74512 9.87701L12.0001 14.132L16.2551 9.87701" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path></svg></button><div class="pdp-carousel__controls__container--thumbnailsColumn pdp-carousel__controls__container--no-arrows" style="--width: 100%; --height: 439px; --nr-thumbnails: 7;"><div class="pdp-carousel__controls__wrapper--thumbnailsColumn pdp-carousel__controls__wrapper"><div role="group" aria-label="Carousel Controls" class="pdp-carousel__controls pdp-carousel__controls--thumbnailsColumn"><label class="pdp-carousel__thumbnail__container"><input type="radio" name="carousel-thumbnails" aria-label="Show slide 1 of 7" class="pdp-carousel__thumbnail pdp-carousel__thumbnail--selected"><span class="pdp-carousel__thumbnail__span"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 1 of 7" width="200" height="248" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png" srcset="//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=80 768w,
//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=106.66666666666667 1024w,
//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=142.29166666666666 1366w,
//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=200 1920w" class="dropin-image dropin-image--loaded"></span></label><label class="pdp-carousel__thumbnail__container"><input type="radio" name="carousel-thumbnails" aria-label="Show slide 2 of 7" class="pdp-carousel__thumbnail"><span class="pdp-carousel__thumbnail__span"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 2 of 7" width="200" height="248" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png" srcset="//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=80 768w,
//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=106.66666666666667 1024w,
//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=142.29166666666666 1366w,
//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=200 1920w" class="dropin-image dropin-image--loaded"></span></label><label class="pdp-carousel__thumbnail__container"><input type="radio" name="carousel-thumbnails" aria-label="Show slide 3 of 7" class="pdp-carousel__thumbnail"><span class="pdp-carousel__thumbnail__span"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 3 of 7" width="200" height="248" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png" srcset="//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=80 768w,
//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=106.66666666666667 1024w,
//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=142.29166666666666 1366w,
//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=200 1920w" class="dropin-image dropin-image--loaded"></span></label><label class="pdp-carousel__thumbnail__container"><input type="radio" name="carousel-thumbnails" aria-label="Show slide 4 of 7" class="pdp-carousel__thumbnail"><span class="pdp-carousel__thumbnail__span"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 4 of 7" width="200" height="248" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png" srcset="//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=80 768w,
//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=106.66666666666667 1024w,
//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=142.29166666666666 1366w,
//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=200 1920w" class="dropin-image dropin-image--loaded"></span></label><label class="pdp-carousel__thumbnail__container"><input type="radio" name="carousel-thumbnails" aria-label="Show slide 5 of 7" class="pdp-carousel__thumbnail"><span class="pdp-carousel__thumbnail__span"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 5 of 7" width="200" height="248" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png" srcset="//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=80 768w,
//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=106.66666666666667 1024w,
//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=142.29166666666666 1366w,
//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=200 1920w" class="dropin-image dropin-image--loaded"></span></label><label class="pdp-carousel__thumbnail__container"><input type="radio" name="carousel-thumbnails" aria-label="Show slide 6 of 7" class="pdp-carousel__thumbnail"><span class="pdp-carousel__thumbnail__span"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 6 of 7" width="200" height="248" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png" srcset="//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=80 768w,
//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=106.66666666666667 1024w,
//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=142.29166666666666 1366w,
//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=200 1920w" class="dropin-image dropin-image--loaded"></span></label><label class="pdp-carousel__thumbnail__container"><input type="radio" name="carousel-thumbnails" aria-label="Show slide 7 of 7" class="pdp-carousel__thumbnail"><span class="pdp-carousel__thumbnail__span"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 7 of 7" width="200" height="248" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png" srcset="//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=80 768w,
//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=106.66666666666667 1024w,
//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=142.29166666666666 1366w,
//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=200 1920w" class="dropin-image dropin-image--loaded"></span></label></div></div></div></div></div></div>
      </div>
      <div class="product-details__right-column">
        <div class="product-details__header"></div>
        <div class="product-details__price"></div>
      <div class="product-details__gallery gary-test23 dropin-design"><div isdiscoverable="true"><div role="region" aria-roledescription="Carousel" class="pdp-carousel pdp-carousel--main-image-controls pdp-carousel--thumbnailsColumn" style="--flex-carousel: row-reverse; --gap: 0; --width: 100%;"><div tabindex="0" class="pdp-carousel__wrapper pdp-carousel__wrapper--horizontal pdp-carousel__wrapper--peak" style="--total-width: 81.6%; --height: auto; --gap: var(--spacing-small); --per-page: 1; scroll-behavior: auto;"><div role="group" aria-roledescription="Slide" data-index="0" class="pdp-carousel__slide pdp-carousel__slide--horizontal pdp-carousel__slide--active" style="--length: 1;"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 1 of 7" width="250" height="250" loading="eager" src="//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png" srcset="//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=100&amp;height=250 768w,
//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=133.33333333333334&amp;height=250 1024w,
//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=177.86458333333334&amp;height=250 1366w,
//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=250&amp;height=250 1920w" class="dropin-image dropin-image--loaded"></div><div role="group" aria-roledescription="Slide" data-index="1" class="pdp-carousel__slide pdp-carousel__slide--horizontal" style="--length: 1;"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 2 of 7" width="250" height="250" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png" srcset="//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=100&amp;height=250 768w,
//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=133.33333333333334&amp;height=250 1024w,
//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=177.86458333333334&amp;height=250 1366w,
//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=250&amp;height=250 1920w" class="dropin-image dropin-image--loaded"></div><div role="group" aria-roledescription="Slide" data-index="2" class="pdp-carousel__slide pdp-carousel__slide--horizontal" style="--length: 1;"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 3 of 7" width="250" height="250" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png" srcset="//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=100&amp;height=250 768w,
//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=133.33333333333334&amp;height=250 1024w,
//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=177.86458333333334&amp;height=250 1366w,
//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=250&amp;height=250 1920w" class="dropin-image dropin-image--loaded"></div><div role="group" aria-roledescription="Slide" data-index="3" class="pdp-carousel__slide pdp-carousel__slide--horizontal" style="--length: 1;"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 4 of 7" width="250" height="250" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png" srcset="//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=100&amp;height=250 768w,
//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=133.33333333333334&amp;height=250 1024w,
//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=177.86458333333334&amp;height=250 1366w,
//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=250&amp;height=250 1920w" class="dropin-image"></div><div role="group" aria-roledescription="Slide" data-index="4" class="pdp-carousel__slide pdp-carousel__slide--horizontal" style="--length: 1;"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 5 of 7" width="250" height="250" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png" srcset="//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=100&amp;height=250 768w,
//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=133.33333333333334&amp;height=250 1024w,
//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=177.86458333333334&amp;height=250 1366w,
//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=250&amp;height=250 1920w" class="dropin-image"></div><div role="group" aria-roledescription="Slide" data-index="5" class="pdp-carousel__slide pdp-carousel__slide--horizontal" style="--length: 1;"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 6 of 7" width="250" height="250" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png" srcset="//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=100&amp;height=250 768w,
//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=133.33333333333334&amp;height=250 1024w,
//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=177.86458333333334&amp;height=250 1366w,
//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=250&amp;height=250 1920w" class="dropin-image"></div><div role="group" aria-roledescription="Slide" data-index="6" class="pdp-carousel__slide pdp-carousel__slide--horizontal" style="--length: 1;"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 7 of 7" width="250" height="250" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png" srcset="//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=100&amp;height=250 768w,
//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=133.33333333333334&amp;height=250 1024w,
//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=177.86458333333334&amp;height=250 1366w,
//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=250&amp;height=250 1920w" class="dropin-image"></div></div><button role="button" aria-label="Previous" disabled="" class="dropin-button dropin-button--medium dropin-button--tertiary dropin-button--tertiary--disabled pdp-carousel__button pdp-carousel__button--prev" style="--height: 439px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="dropin-icon dropin-icon--shape-stroke-2 pdp-carousel__button__icon pdp-carousel__button__icon--prev"><path d="M7.74512 9.87701L12.0001 14.132L16.2551 9.87701" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path></svg></button><button role="button" aria-label="Next" class="dropin-button dropin-button--medium dropin-button--tertiary pdp-carousel__button pdp-carousel__button--next" style="--height: 439px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="dropin-icon dropin-icon--shape-stroke-2 pdp-carousel__button__icon pdp-carousel__button__icon--next"><path d="M7.74512 9.87701L12.0001 14.132L16.2551 9.87701" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path></svg></button><div class="pdp-carousel__controls__container--thumbnailsColumn pdp-carousel__controls__container--no-arrows" style="--width: 100%; --height: 439px; --nr-thumbnails: 7;"><div class="pdp-carousel__controls__wrapper--thumbnailsColumn pdp-carousel__controls__wrapper"><div role="group" aria-label="Carousel Controls" class="pdp-carousel__controls pdp-carousel__controls--thumbnailsColumn"><label class="pdp-carousel__thumbnail__container"><input type="radio" name="carousel-thumbnails" aria-label="Show slide 1 of 7" class="pdp-carousel__thumbnail pdp-carousel__thumbnail--selected"><span class="pdp-carousel__thumbnail__span"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 1 of 7" width="200" height="248" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png" srcset="//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=80 768w,
//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=106.66666666666667 1024w,
//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=142.29166666666666 1366w,
//estorestage.asus.com/pl/media/catalog/product/5/f/5f19fb20e31034f0f25c0589279a34df.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=200 1920w" class="dropin-image dropin-image--loaded"></span></label><label class="pdp-carousel__thumbnail__container"><input type="radio" name="carousel-thumbnails" aria-label="Show slide 2 of 7" class="pdp-carousel__thumbnail"><span class="pdp-carousel__thumbnail__span"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 2 of 7" width="200" height="248" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png" srcset="//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=80 768w,
//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=106.66666666666667 1024w,
//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=142.29166666666666 1366w,
//estorestage.asus.com/pl/media/catalog/product/b/1/b1d99bb948f6282a48260f376e6797d8.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=200 1920w" class="dropin-image dropin-image--loaded"></span></label><label class="pdp-carousel__thumbnail__container"><input type="radio" name="carousel-thumbnails" aria-label="Show slide 3 of 7" class="pdp-carousel__thumbnail"><span class="pdp-carousel__thumbnail__span"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 3 of 7" width="200" height="248" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png" srcset="//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=80 768w,
//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=106.66666666666667 1024w,
//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=142.29166666666666 1366w,
//estorestage.asus.com/pl/media/catalog/product/9/f/9f222d2834fa6a327bac78e62667c401.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=200 1920w" class="dropin-image dropin-image--loaded"></span></label><label class="pdp-carousel__thumbnail__container"><input type="radio" name="carousel-thumbnails" aria-label="Show slide 4 of 7" class="pdp-carousel__thumbnail"><span class="pdp-carousel__thumbnail__span"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 4 of 7" width="200" height="248" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png" srcset="//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=80 768w,
//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=106.66666666666667 1024w,
//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=142.29166666666666 1366w,
//estorestage.asus.com/pl/media/catalog/product/a/4/a443dcb2afa19429606d41b9bd10c393.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=200 1920w" class="dropin-image dropin-image--loaded"></span></label><label class="pdp-carousel__thumbnail__container"><input type="radio" name="carousel-thumbnails" aria-label="Show slide 5 of 7" class="pdp-carousel__thumbnail"><span class="pdp-carousel__thumbnail__span"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 5 of 7" width="200" height="248" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png" srcset="//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=80 768w,
//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=106.66666666666667 1024w,
//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=142.29166666666666 1366w,
//estorestage.asus.com/pl/media/catalog/product/f/9/f9dff5f1117754b44d398b26939847b4.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=200 1920w" class="dropin-image dropin-image--loaded"></span></label><label class="pdp-carousel__thumbnail__container"><input type="radio" name="carousel-thumbnails" aria-label="Show slide 6 of 7" class="pdp-carousel__thumbnail"><span class="pdp-carousel__thumbnail__span"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 6 of 7" width="200" height="248" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png" srcset="//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=80 768w,
//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=106.66666666666667 1024w,
//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=142.29166666666666 1366w,
//estorestage.asus.com/pl/media/catalog/product/6/a/6a35bea2f27fd647568d7d4dd1d52a59.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=200 1920w" class="dropin-image dropin-image--loaded"></span></label><label class="pdp-carousel__thumbnail__container"><input type="radio" name="carousel-thumbnails" aria-label="Show slide 7 of 7" class="pdp-carousel__thumbnail"><span class="pdp-carousel__thumbnail__span"><img title="VivoBook 14 K413 (11th gen Intel)" alt="VivoBook 14 K413 (11th gen Intel) Image 7 of 7" width="200" height="248" loading="lazy" src="//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png" srcset="//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=80 768w,
//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=106.66666666666667 1024w,
//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=142.29166666666666 1366w,
//estorestage.asus.com/pl/media/catalog/product/3/9/39a34620623d7a84bc2a6ad6c0e1ae75.png?auto=webp&amp;quality=80&amp;crop=false&amp;fit=cover&amp;width=200 1920w" class="dropin-image dropin-image--loaded"></span></label></div></div></div></div></div></div>
      </div>
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


    // Gallery (Desktop)
    pdpRendered.render(ProductGallery, {
      controls: 'thumbnailsColumn',
      arrows: true,
      peak: true,
      gap: 'small', 
      loop: false,
      imageParams: {
        ...IMAGES_SIZES.mobile
      },isDiscoverable: true
    })($gallery),

    // Header
    pdpRendered.render(ProductHeader, {})($header),

    // Price
    pdpRendered.render(ProductPrice, {})($price),

    // Short Description
    pdpRendered.render(ProductShortDescription, {})($shortDescription),

    // Configuration - Swatches
    pdpRendered.render(ProductOptions, { hideSelectedValue: false })($options),

    // Configuration  Quantity
    pdpRendered.render(ProductQuantity, {})($quantity),

    // Configuration – Button - Add to Cart
    UI.render(Button, {
      children: labels.PDP?.Product?.AddToCart?.label,
      icon: Icon({ source: 'Cart' }),
      onClick: async () => {
        try {
          addToCart.setProps((prev) => ({
            ...prev,
            children: labels.Custom?.AddingToCart?.label,
            disabled: true,
          }));

          // get the current selection values
          const values = pdpApi.getProductConfigurationValues();
          const valid = pdpApi.isProductConfigurationValid();

          // add the product to the cart
          if (valid) {
            const { addProductsToCart } = await import('@dropins/storefront-cart/api.js');
            await addProductsToCart([{ ...values }]);
          }

          // reset any previous alerts if successful
          inlineAlert?.remove();
        } catch (error) {
          // add alert message
          inlineAlert = await UI.render(InLineAlert, {
            heading: 'Error',
            description: error.message,
            icon: Icon({ source: 'Warning' }),
            'aria-live': 'assertive',
            role: 'alert',
            onDismiss: () => {
              inlineAlert.remove();
            },
          })($alert);

          // Scroll the alertWrapper into view
          $alert.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        } finally {
          addToCart.setProps((prev) => ({
            ...prev,
            children: labels.PDP?.Product?.AddToCart?.label,
            disabled: false,
          }));
        }
      },
    })($addToCart),

    // Configuration - Add to Wishlist
    UI.render(Button, {
      icon: Icon({ source: 'Heart' }),
      variant: 'secondary',
      'aria-label': labels.Custom?.AddToWishlist?.label,
      onClick: async () => {
        try {
          addToWishlist.setProps((prev) => ({
            ...prev,
            disabled: true,
            'aria-label': labels.Custom?.AddingToWishlist?.label,
          }));

          const values = pdpApi.getProductConfigurationValues();

          if (values?.sku) {
            const wishlist = await import('../../scripts/wishlist/api.js');
            await wishlist.addToWishlist(values.sku);
          }
        } catch (error) {
          console.error(error);
        } finally {
          addToWishlist.setProps((prev) => ({
            ...prev,
            disabled: false,
            'aria-label': labels.Custom?.AddToWishlist?.label,
          }));
        }
      },
    })($addToWishlist),

    // Description
    pdpRendered.render(ProductDescription, {})($description),

    // Attributes
    pdpRendered.render(ProductAttributes, {})($attributes),
  ]);

  // Lifecycle Events
  events.on('pdp/valid', (valid) => {
    // update add to cart button disabled state based on product selection validity
    addToCart.setProps((prev) => ({ ...prev, disabled: !valid }));
  }, { eager: true });

  // Set JSON-LD and Meta Tags
  events.on(
    'eds/lcp',
    () => {
      if (product) {
        setJsonLdProduct(product);
        setMetaTags(product);
        document.title = product.name;
      }
    },
    { eager: true },
  );

  return Promise.resolve();
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
