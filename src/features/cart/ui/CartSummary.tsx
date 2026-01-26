import { Button } from "@/shared/ui/Button";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
  disabled?: boolean;
}

export function CartSummary({
  subtotal,
  shipping,
  total,
  onCheckout,
  disabled = false,
}: CartSummaryProps) {
  const isFreeShipping = shipping === 0;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-zinc-900">주문 요약</h2>

      <div className="space-y-3 border-b border-zinc-200 pb-4">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600">상품 금액</span>
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

      <div className="mt-4 flex justify-between">
        <span className="text-base font-semibold text-zinc-900">총 결제 금액</span>
        <span className="text-xl font-bold text-zinc-900">
          {total.toLocaleString()}원
        </span>
      </div>

      <Button
        variant="primary"
        size="lg"
        onClick={onCheckout}
        disabled={disabled}
        className="mt-6 w-full"
      >
        주문하기
      </Button>

      <div className="mt-4 space-y-2 text-xs text-zinc-500">
        <p>• 무료 배송 (전 상품)</p>
        <p>• 1-3일 이내 배송</p>
      </div>
    </div>
  );
}
