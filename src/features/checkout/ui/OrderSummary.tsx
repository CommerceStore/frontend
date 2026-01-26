import type { CartItem } from "@/entities/cart/types";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export function OrderSummary({ items, subtotal, shipping, total }: OrderSummaryProps) {
  const isFreeShipping = shipping === 0;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-zinc-900">주문 상품</h2>

      <div className="mb-4 max-h-64 space-y-3 overflow-y-auto">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-3 pb-3 border-b border-zinc-100 last:border-0">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-zinc-200 bg-zinc-50">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="text-sm font-medium text-zinc-900 line-clamp-1">
                  {item.product.name}
                </h3>
                <p className="mt-0.5 text-xs text-zinc-500">수량: {item.quantity}개</p>
              </div>
              <p className="text-sm font-semibold text-zinc-900">
                {(item.product.price * item.quantity).toLocaleString()}원
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t border-zinc-200 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600">상품 금액 ({itemCount}개)</span>
          <span className="font-medium text-zinc-900">
            {subtotal.toLocaleString()}원
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600">배송비</span>
          <span className="font-medium text-zinc-900">
            {isFreeShipping ? (
              <span className="text-primary-600">무료</span>
            ) : (
              `${shipping.toLocaleString()}원`
            )}
          </span>
        </div>
      </div>

      <div className="mt-4 flex justify-between border-t border-zinc-200 pt-4">
        <span className="text-base font-semibold text-zinc-900">총 결제 금액</span>
        <span className="text-xl font-bold text-primary-600">
          {total.toLocaleString()}원
        </span>
      </div>

      <div className="mt-4 rounded-lg bg-zinc-50 p-3 text-xs text-zinc-600">
        <p className="font-medium text-zinc-700 mb-1">배송 안내</p>
        <ul className="space-y-1">
          <li>• 무료 배송 (전 상품)</li>
          <li>• 1-3일 이내 배송</li>
          <li>• 배송 완료 후 7일 이내 교환/환불 가능</li>
        </ul>
      </div>
    </div>
  );
}
