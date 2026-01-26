export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // 할인 전 가격
  stock: number;
  imageUrl: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export type SortOption = "newest" | "popularity" | "price-low" | "price-high";
