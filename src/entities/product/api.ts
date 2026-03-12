import { api } from "@/shared/api/client";
import type { Product } from "./types";

export interface ProductsParams {
  category?: string;
  sort?: "price_asc" | "price_desc" | "latest";
  search?: string;
  page?: number;
  limit?: number;
}

interface ProductListResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

interface ProductResponse {
  data: Product;
}

export async function fetchProducts(
  params?: ProductsParams
): Promise<Product[]> {
  const res = await api.get<ProductListResponse>("/products", {
    params: params as Record<string, string | number | boolean | undefined>,
  });
  return res.data;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await api.get<ProductResponse>(`/products/${id}`);
    return res.data;
  } catch {
    return null;
  }
}
