import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/widgets/layout/Layout";
import { useCartStore } from "@/features/cart";
import { ShippingForm } from "@/features/checkout/ui/ShippingForm";
import { OrderSummary } from "@/features/checkout/ui/OrderSummary";
import { Button } from "@/shared/ui/Button";
import { Toast, ToastContainer } from "@/shared/ui/Toast";
import { calculateShippingFee } from "@/entities/cart";
import { useCheckout } from "@/features/checkout/hooks/useCheckout";

export function CheckoutPage() {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const getTotal = useCartStore((state) => state.getTotal);

  const {
    showValidationError,
    isProcessing,
    toast,
    handleShippingSubmit,
    handlePayment,
    closeToast,
  } = useCheckout();

  const subtotal = getTotal();
  const shipping = calculateShippingFee(subtotal);
  const total = subtotal + shipping;
  const cartItemCount = cart.items.length;

  useEffect(() => {
    if (cart.items.length === 0) {
      navigate("/cart");
    }
  }, [cart.items.length, navigate]);

  if (cart.items.length === 0) {
    return null;
  }

  return (
    <Layout onSearch={() => {}} cartItemCount={cartItemCount}>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-zinc-900">주문/결제</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ShippingForm
              onSubmit={handleShippingSubmit}
              disabled={isProcessing}
              showValidationError={showValidationError}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <OrderSummary
                items={cart.items}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
              />

              <Button
                variant="primary"
                size="lg"
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing
                  ? "처리 중..."
                  : `${total.toLocaleString()}원 결제하기`}
              </Button>

              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-zinc-900">
                  결제 정보 안내
                </h3>
                <ul className="space-y-1 text-xs text-zinc-600">
                  <li>• 실제 결제는 연동되지 않았습니다</li>
                  <li>• 주문 완료 시 장바구니가 초기화됩니다</li>
                  <li>• 70% 확률로 성공, 30% 확률로 실패합니다</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer>
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={closeToast}
          />
        )}
      </ToastContainer>
    </Layout>
  );
}
