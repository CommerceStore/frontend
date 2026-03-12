import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/client";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import type { Cart } from "@/entities/cart/types";

export const cartQueryKey = ["cart"] as const;

interface CartResponse {
  data: Cart;
}

export function useCartQuery() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: cartQueryKey,
    queryFn: async () => {
      const res = await api.get<CartResponse>("/cart");
      return res.data;
    },
    enabled: isAuthenticated,
  });
}
