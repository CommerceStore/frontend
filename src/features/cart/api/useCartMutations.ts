import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/client";
import { cartQueryKey } from "./useCartQuery";

export function useAddCartItemMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => api.post("/cart/items", { body: { productId, quantity } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: cartQueryKey }),
  });
}

export function useUpdateCartItemMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      quantity,
    }: {
      itemId: string;
      quantity: number;
    }) => api.patch(`/cart/items/${itemId}`, { body: { quantity } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: cartQueryKey }),
  });
}

export function useRemoveCartItemMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => api.delete(`/cart/items/${itemId}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: cartQueryKey }),
  });
}

export function useClearCartMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => api.delete("/cart"),
    onSuccess: () => qc.invalidateQueries({ queryKey: cartQueryKey }),
  });
}
