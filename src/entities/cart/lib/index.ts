import type { Cart, CartItem } from "../types";
import type { Product } from "../../product/types";

/**
 * 장바구니 아이템의 소계 계산
 */
export function calculateItemSubtotal(item: CartItem): number {
  return item.product.price * item.quantity;
}

/**
 * 장바구니 전체 총액 계산
 */
export function calculateCartTotal(cart: Cart): number {
  return cart.items.reduce((total, item) => {
    return total + calculateItemSubtotal(item);
  }, 0);
}

/**
 * 장바구니 전체 아이템 개수 계산
 */
export function calculateCartItemCount(cart: Cart): number {
  return cart.items.reduce((count, item) => count + item.quantity, 0);
}

/**
 * 장바구니에서 특정 상품 찾기
 */
export function findCartItem(
  cart: Cart,
  productId: string
): CartItem | undefined {
  return cart.items.find((item) => item.product.id === productId);
}

/**
 * 장바구니가 비어있는지 확인
 */
export function isCartEmpty(cart: Cart): boolean {
  return cart.items.length === 0;
}

/**
 * 장바구니에 상품 추가 (불변성 유지)
 */
export function addToCart(
  cart: Cart,
  product: Product,
  quantity: number = 1
): Cart {
  const existingItem = findCartItem(cart, product.id);

  if (existingItem) {
    return {
      items: cart.items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ),
      updatedAt: new Date().toISOString(),
    };
  }

  return {
    items: [
      ...cart.items,
      {
        product,
        quantity,
        addedAt: new Date().toISOString(),
      },
    ],
    updatedAt: new Date().toISOString(),
  };
}

/**
 * 장바구니 아이템 수량 변경 (불변성 유지)
 */
export function updateCartItemQuantity(
  cart: Cart,
  productId: string,
  quantity: number
): Cart {
  if (quantity <= 0) {
    return removeFromCart(cart, productId);
  }

  return {
    items: cart.items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    ),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * 장바구니에서 상품 제거 (불변성 유지)
 */
export function removeFromCart(cart: Cart, productId: string): Cart {
  return {
    items: cart.items.filter((item) => item.product.id !== productId),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * 장바구니 비우기 (불변성 유지)
 */
export function clearCart(): Cart {
  return {
    items: [],
    updatedAt: new Date().toISOString(),
  };
}
