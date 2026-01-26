import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/entities/product/api";
import type { Product } from "@/entities/product/types";
import type { ApiError } from "@/shared/api/client";

export function useProductQuery(productId: string) {
  return useQuery<Product | null, ApiError>({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
