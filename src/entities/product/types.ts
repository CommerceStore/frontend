export type ProductCategory =
  | "ELECTRONICS"
  | "FASHION"
  | "BEAUTY"
  | "FOOD"
  | "SPORTS"
  | "HOME"
  | "BOOKS"
  | "KIDS";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // 할인 전 가격
  stock: number;
  imageUrl: string;
  category: ProductCategory;
  createdAt: string;
  updatedAt: string;
}

export type SortOption = "newest" | "popularity" | "price-low" | "price-high";
