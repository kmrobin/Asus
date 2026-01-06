/* eslint-disable object-curly-spacing, class-methods-use-this */
import {
  h, Component, Fragment,
} from '@dropins/tools/preact.js';
import htm from '../../scripts/htm.js';
import {
  renderPrice,
} from '../../scripts/commerce.js';

const html = htm.bind(h);
const searchUnitId = 'livesearch-plp';

class ProductCard extends Component {
  constructor(props) {
    super();
    this.formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    this.baseProduct = props.product;
  }

  renderImage(loading = 'lazy') {
    const { product } = this.props;

    // Placeholder as fallback
    let image;

    // Use base image if available
    if (product.images && product.images.length > 0) {
      image = product.images[0].url;
    }

    if (!image) {
      return html`<div class="no-image"></div>`;
    }

    const url = new URL(image);
    url.protocol = 'https:';
    url.search = '';

    // 优化：根据图像在页面中的位置确定加载优先级
    const isLCPImage = this.props.index < 2; // 假设前两个图像是LCP元素
    const fetchPriority = isLCPImage ? 'high' : 'auto';
    const imageLoading = this.props.index < 2 ? 'eager' : 'lazy'; // 只对前2个图像使用eager加载，避免资源竞争

    // 预加载LCP相关的图像
    if (isLCPImage) {
      // 检查图像是否已经预加载
      const existingPreload = Array.from(document.head.querySelectorAll('link[rel="preload"][as="image"]'))
        .find(link => link.href === url.toString());
        
      if (!existingPreload) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = url.toString();
        preloadLink.fetchpriority = 'high';
        document.head.appendChild(preloadLink);
      }
    }

    return html`<picture>
      <source type="image/webp" srcset="${url}?width=163&bg-color=255,255,255&format=webply&optimize=medium 1x,${url}?width=326&bg-color=255,255,255&format=webply&optimize=medium 2x, ${url}?width=489&bg-color=255,255,255&format=webply&optimize=medium 3x" media="(max-width: 900px)" />
      <source type="image/webp" srcset="${url}?width=330&bg-color=255,255,255&format=webply&optimize=medium 1x, ${url}?width=660&bg-color=255,255,255&format=webply&optimize=medium 2x, ${url}?width=990&bg-color=255,255,255&format=webply&optimize=medium 3x" />
      <img class="product-image-photo" src="${url}?width=330&quality=100&bg-color=255,255,255" max-width="330" max-height="396" alt=${product.name} loading=${imageLoading} fetchpriority=${fetchPriority} />
    </picture>`;
  }

  onProductClick(product) {
    window.adobeDataLayer.push((dl) => {
      // TODO: Remove eventInfo once collector is updated
      dl.push({ event: 'search-product-click', eventInfo: { ...dl.getState(), searchUnitId, sku: product.sku } });
    });
  }

  render({
    product, loading, index, secondLastProduct,
  }) {
    if (loading) {
      return html`
      <li>
        <div class="picture shimmer"></div>
        <div class="variants"></div>
        <div class="name">
          <div class="shimmer shimmer-text"></div>
          <div class="shimmer shimmer-text" style="max-width: 70%"></div>
        </div>
        <div class="price">
          <div class="shimmer shimmer-text" style="max-width: 30%"></div>
        </div>
        <div class="rating"></div>
      </li>`;
    }

    const isMobile = window.matchMedia('only screen and (max-width: 900px)').matches;
    const numberOfEagerImages = isMobile ? 2 : 2; // 减少eager加载的图片数量，避免资源竞争

    return html`
      <li index=${index} ref=${secondLastProduct}>
        <a href="${product.url}" onClick=${() => this.onProductClick(product)}>
          ${this.renderImage(index < numberOfEagerImages ? 'eager' : 'lazy')}
          <div class="name">${product.name}</div>
          <div class="price">${renderPrice(product, this.formatter)}</div>
          <div class="rating">
            <span class="rating-stars" style="width: ${product.rating_summary?.average * 20}%"></span>
          </div>
        </a>
      </li>`;
  }
}

export default ProductCard;