export type { Product, ProductStatus } from './types';
export {
  formatPrice,
  calculateDiscountRate,
  calculateDiscountAmount,
  getStockStatus,
  isProductAvailable,
  hasDiscount,
} from './lib';
export { MOCK_PRODUCTS } from './mock';
export { fetchProducts, fetchProductById, fetchProductsByCategory } from './api';
