import { mockApiResponse } from "@/shared/api/mock";
import { MOCK_PRODUCTS } from "./mock";
import type { Product } from "./types";

/**
 * 모든 상품 조회 (Mock)
 */
export async function fetchProducts(): Promise<Product[]> {
  return mockApiResponse(MOCK_PRODUCTS);
}

/**
 * 특정 상품 조회 (Mock)
 */
export async function fetchProductById(id: string): Promise<Product | null> {
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  return mockApiResponse(product ?? null);
}

/**
 * 카테고리별 상품 조회 (Mock)
 */
export async function fetchProductsByCategory(
  category: string
): Promise<Product[]> {
  const products = MOCK_PRODUCTS.filter((p) => p.category === category);
  return mockApiResponse(products);
}
