export type ProductStatus = 'available' | 'out_of_stock' | 'discontinued';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // 할인 전 가격
  stock: number;
  status: ProductStatus;
  imageUrl: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
