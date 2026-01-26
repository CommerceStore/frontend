import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cart } from "@/entities/cart/types";
import type { Product } from "@/entities/product/types";
import {
  addToCart as addToCartHelper,
  updateCartItemQuantity as updateQuantityHelper,
  removeFromCart as removeFromCartHelper,
  clearCart as clearCartHelper,
  calculateCartTotal,
  calculateCartItemCount,
} from "@/entities/cart";

interface CartStore {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const INITIAL_CART: Cart = {
  items: [],
  updatedAt: new Date().toISOString(),
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: INITIAL_CART,

      addToCart: (product, quantity = 1) => {
        set((state) => ({
          cart: addToCartHelper(state.cart, product, quantity),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          cart: updateQuantityHelper(state.cart, productId, quantity),
        }));
      },

      removeItem: (productId) => {
        set((state) => ({
          cart: removeFromCartHelper(state.cart, productId),
        }));
      },

      clearCart: () => {
        set({ cart: clearCartHelper() });
      },

      getTotal: () => {
        return calculateCartTotal(get().cart);
      },

      getItemCount: () => {
        return calculateCartItemCount(get().cart);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
