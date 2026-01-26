import type { Product } from "@/entities/product/types";
import { ProductCard } from "./ProductCard";

interface ProductsGridProps {
  products: Product[];
  onProductClick?: (productId: string) => void;
}

export function ProductsGrid({ products, onProductClick }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
}
