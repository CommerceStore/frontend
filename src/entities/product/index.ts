export type { Product } from "./types";
export {
  formatPrice,
  calculateDiscountRate,
  calculateDiscountAmount,
  isInStock,
  isProductAvailable,
  hasDiscount,
} from "./lib";
export { MOCK_PRODUCTS } from "./mock";
export { fetchProducts, fetchProductById } from "./api";
