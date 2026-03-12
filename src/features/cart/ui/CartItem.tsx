import type { CartItem as CartItemType } from "@/entities/cart/types";
import { calculateItemSubtotal } from "@/entities/cart";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item;
  const subtotal = calculateItemSubtotal(item);
  const isOutOfStock = product.stock === 0;
  const maxQuantity = product.stock;

  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(item.id, quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      onUpdateQuantity(item.id, quantity + 1);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="flex gap-4 border-b border-zinc-200 py-6 last:border-b-0">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-zinc-900">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-500">{product.category}</p>
          </div>
          <button
            onClick={handleRemove}
            className="ml-4 text-zinc-400 hover:text-zinc-600"
            aria-label="삭제"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div className="flex items-center gap-2 rounded-lg border border-zinc-300">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="px-3 py-1.5 text-zinc-600 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:text-zinc-300"
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
            <span className="w-12 text-center text-sm font-medium text-zinc-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              disabled={quantity >= maxQuantity || isOutOfStock}
              className="px-3 py-1.5 text-zinc-600 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:text-zinc-300"
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

          <div className="text-right">
            <p className="text-lg font-bold text-zinc-900">
              {subtotal.toLocaleString()}원
            </p>
            {quantity > 1 && (
              <p className="mt-0.5 text-xs text-zinc-500">
                {product.price.toLocaleString()}원 × {quantity}
              </p>
            )}
          </div>
        </div>

        {isOutOfStock && (
          <p className="mt-2 text-sm font-medium text-red-600">품절된 상품입니다</p>
        )}
        {!isOutOfStock && quantity >= maxQuantity && (
          <p className="mt-2 text-sm text-zinc-500">
            최대 구매 가능 수량입니다 (재고: {maxQuantity}개)
          </p>
        )}
      </div>
    </div>
  );
}
