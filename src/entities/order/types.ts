import type { Product } from '../product/types';

export type OrderStatus =
  | 'pending' // 주문 대기
  | 'confirmed' // 주문 확인
  | 'preparing' // 상품 준비 중
  | 'shipped' // 배송 중
  | 'delivered' // 배송 완료
  | 'cancelled'; // 주문 취소

export interface OrderItem {
  product: Product;
  quantity: number;
  priceAtOrder: number; // 주문 당시 가격 (가격 변동 대비)
}

export interface ShippingAddress {
  recipientName: string;
  phone: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  deliveryRequest?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  totalAmount: number;
  shippingFee: number;
  createdAt: string;
  updatedAt: string;
}
