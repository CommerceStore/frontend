import type { CartItem as CartItemType } from "@/entities/cart/types";
import { CartItem } from "./CartItem";
import { EmptyState } from "@/shared/ui/EmptyState";

interface CartListProps {
  items: CartItemType[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartList({ items, onUpdateQuantity, onRemove }: CartListProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="장바구니가 비어있습니다"
        description="상품을 담아보세요"
        actionLabel="쇼핑 계속하기"
        actionHref="/"
      />
    );
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white">
      <div className="border-b border-zinc-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-zinc-900">
          장바구니 ({items.length})
        </h2>
      </div>
      <div className="px-6">
        {items.map((item) => (
          <CartItem
            key={item.product.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}
