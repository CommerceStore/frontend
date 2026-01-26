import type { Product } from "@/entities/product/types";
import { Badge } from "@/shared/ui/Badge";

interface ProductCardProps {
  product: Product;
  onClick?: (productId: string) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountRate = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price) / product.originalPrice!) *
          100,
      )
    : 0;

  const isOutOfStock = product.status === "out_of_stock";
  const isDiscontinued = product.status === "discontinued";

  return (
    <article
      onClick={() => onClick?.(product.id)}
      className={`
        group cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm
        transition-all hover:border-zinc-300 hover:shadow-md
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2
        ${isOutOfStock || isDiscontinued ? "opacity-60" : ""}
      `}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(product.id);
        }
      }}
      role="button"
      aria-label={`${product.name} 상품 상세 보기`}
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {hasDiscount && (
          <Badge variant="sale" className="absolute left-2 top-2">
            {discountRate}%
          </Badge>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Badge variant="soldout">품절</Badge>
          </div>
        )}
        {isDiscontinued && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Badge variant="soldout">단종</Badge>
          </div>
        )}
      </div>

      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 min-h-14 text-lg font-bold text-zinc-900">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-zinc-900">
            {product.price.toLocaleString()}원
          </span>
          {hasDiscount && (
            <span className="text-sm text-zinc-500 line-through">
              {product.originalPrice!.toLocaleString()}원
            </span>
          )}
        </div>

        {product.stock > 0 &&
          product.stock <= 10 &&
          product.status === "available" && (
            <p className="text-xs text-orange-600">
              재고 {product.stock}개 남음
            </p>
          )}
      </div>
    </article>
  );
}
