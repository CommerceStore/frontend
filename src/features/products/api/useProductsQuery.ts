import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/entities/product/api";
import type { ProductsParams } from "@/entities/product/api";

export function useProductsQuery(params?: ProductsParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
  });
}
