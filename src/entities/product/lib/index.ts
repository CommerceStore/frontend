import type { Product, ProductStatus } from "../types";

/**
 * 가격을 원화 형식으로 포맷팅
 */
export function formatPrice(price: number): string {
  return `${price.toLocaleString("ko-KR")}원`;
}

/**
 * 할인율 계산 (0-100 사이의 정수)
 */
export function calculateDiscountRate(
  originalPrice: number,
  currentPrice: number
): number {
  if (originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * 할인 금액 계산
 */
export function calculateDiscountAmount(
  originalPrice: number,
  currentPrice: number
): number {
  return Math.max(0, originalPrice - currentPrice);
}

/**
 * 상품의 재고 상태 판단
 */
export function getStockStatus(product: Product): ProductStatus {
  if (product.status === "discontinued") return "discontinued";
  if (product.stock <= 0) return "out_of_stock";
  return "available";
}

/**
 * 상품이 구매 가능한지 확인
 */
export function isProductAvailable(product: Product): boolean {
  return product.status === "available" && product.stock > 0;
}

/**
 * 할인 여부 확인
 */
export function hasDiscount(product: Product): boolean {
  return !!product.originalPrice && product.originalPrice > product.price;
}
