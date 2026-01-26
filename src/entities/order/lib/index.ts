import type { Order, OrderItem, OrderStatus } from '../types';
import type { Cart } from '../../cart/types';

/**
 * 주문 아이템의 소계 계산
 */
export function calculateOrderItemSubtotal(item: OrderItem): number {
  return item.priceAtOrder * item.quantity;
}

/**
 * 주문 상품 총액 계산 (배송비 제외)
 */
export function calculateOrderSubtotal(order: Order): number {
  return order.items.reduce((total, item) => {
    return total + calculateOrderItemSubtotal(item);
  }, 0);
}

/**
 * 주문 최종 금액 계산 (배송비 포함)
 */
export function calculateOrderTotal(order: Order): number {
  return order.totalAmount + order.shippingFee;
}

/**
 * 배송비 계산 (5만원 이상 무료배송)
 */
export function calculateShippingFee(subtotal: number): number {
  const FREE_SHIPPING_THRESHOLD = 50000;
  const DEFAULT_SHIPPING_FEE = 3000;

  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_FEE;
}

/**
 * 장바구니에서 주문 아이템 생성
 */
export function createOrderItemsFromCart(cart: Cart): OrderItem[] {
  return cart.items.map((cartItem) => ({
    product: cartItem.product,
    quantity: cartItem.quantity,
    priceAtOrder: cartItem.product.price,
  }));
}

/**
 * 주문 상태 표시 텍스트 반환
 */
export function getOrderStatusText(status: OrderStatus): string {
  const statusMap: Record<OrderStatus, string> = {
    pending: '주문 대기',
    confirmed: '주문 확인',
    preparing: '상품 준비 중',
    shipped: '배송 중',
    delivered: '배송 완료',
    cancelled: '주문 취소',
  };

  return statusMap[status];
}

/**
 * 주문 취소 가능 여부 확인
 */
export function canCancelOrder(order: Order): boolean {
  return order.status === 'pending' || order.status === 'confirmed';
}

/**
 * 주문이 완료 상태인지 확인
 */
export function isOrderCompleted(order: Order): boolean {
  return order.status === 'delivered' || order.status === 'cancelled';
}
