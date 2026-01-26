import { useState } from "react";
import type { Product } from "@/entities/product/types";
import { Button } from "@/shared/ui/Button";
import { Badge } from "@/shared/ui/Badge";

interface ProductDetailProps {
  product: Product;
  onAddToCart?: (quantity: number) => void;
  onBuyNow?: (quantity: number) => void;
}

export function ProductDetail({
  product,
  onAddToCart,
  onBuyNow,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountRate = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCartClick = () => {
    onAddToCart?.(quantity);
  };

  const handleBuyNowClick = () => {
    onBuyNow?.(quantity);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* 이미지 영역 */}
        <div className="aspect-square overflow-hidden rounded-lg bg-zinc-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* 정보 영역 */}
        <div className="flex flex-col">
          {/* 카테고리 */}
          <div className="mb-3">
            <span className="text-sm font-medium text-zinc-500">
              {product.category}
            </span>
          </div>

          {/* 상품명 */}
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
            {product.name}
          </h1>

          {/* 가격 영역 */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              {hasDiscount && (
                <>
                  <Badge variant="sale">{discountRate}%</Badge>
                  <span className="text-lg text-zinc-400 line-through">
                    {product.originalPrice!.toLocaleString()}원
                  </span>
                </>
              )}
            </div>
            <div className="mt-2 text-4xl font-bold text-zinc-900">
              {product.price.toLocaleString()}원
            </div>
          </div>

          {/* 재고 및 배송 정보 */}
          <div className="mb-6 space-y-3 border-y border-zinc-200 py-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-600">재고</span>
              <div className="flex items-center gap-2">
                {isOutOfStock ? (
                  <Badge variant="soldout">품절</Badge>
                ) : isLowStock ? (
                  <>
                    <Badge variant="sale">재고 부족</Badge>
                    <span className="text-sm text-zinc-900">
                      {product.stock}개 남음
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-medium text-primary-600">
                    재고 있음
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-600">배송</span>
              <span className="text-sm text-zinc-900">무료배송</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-600">도착 예정</span>
              <span className="text-sm text-zinc-900">1-3일 이내</span>
            </div>
          </div>

          {/* 수량 선택 */}
          {!isOutOfStock && (
            <div className="mb-8">
              <label className="mb-3 block text-sm font-medium text-zinc-900">
                수량
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-zinc-300 rounded-lg">
                  <button
                    type="button"
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1}
                    className="px-4 py-2 text-zinc-600 hover:bg-zinc-50 disabled:text-zinc-300 disabled:cursor-not-allowed transition-colors"
                    aria-label="수량 감소"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="w-16 text-center text-base font-medium text-zinc-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncreaseQuantity}
                    disabled={quantity >= product.stock}
                    className="px-4 py-2 text-zinc-600 hover:bg-zinc-50 disabled:text-zinc-300 disabled:cursor-not-allowed transition-colors"
                    aria-label="수량 증가"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
                <span className="text-sm text-zinc-500">
                  (최대 {product.stock}개)
                </span>
              </div>
            </div>
          )}

          {/* 상품 설명 */}
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-semibold text-zinc-900">상품 설명</h2>
            <p className="whitespace-pre-wrap text-zinc-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* CTA 버튼 */}
          <div className="mt-auto space-y-3">
            {isOutOfStock && (
              <div className="rounded-lg bg-zinc-100 px-4 py-3 text-center">
                <p className="text-sm font-medium text-zinc-600">
                  현재 품절된 상품입니다
                </p>
              </div>
            )}
            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="lg"
                disabled={isOutOfStock}
                onClick={handleAddToCartClick}
                className="flex-1"
              >
                장바구니에 추가
              </Button>
              <Button
                variant="primary"
                size="lg"
                disabled={isOutOfStock}
                onClick={handleBuyNowClick}
                className="flex-1"
              >
                바로 구매
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
