import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/widgets/layout/Layout";
import { useCartQuery } from "@/features/cart";
import { ShippingForm } from "@/features/checkout/ui/ShippingForm";
import { OrderSummary } from "@/features/checkout/ui/OrderSummary";
import { Button } from "@/shared/ui/Button";
import { Toast, ToastContainer } from "@/shared/ui/Toast";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import { calculateCartTotal, calculateShippingFee } from "@/entities/cart";
import { useCheckout } from "@/features/checkout/hooks/useCheckout";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { data: cart, isLoading } = useCartQuery();

  const {
    showValidationError,
    isProcessing,
    toast,
    handleShippingSubmit,
    handlePayment,
    closeToast,
  } = useCheckout();

  const items = cart?.items ?? [];
  const subtotal = cart ? calculateCartTotal(cart) : 0;
  const shipping = calculateShippingFee(subtotal);
  const total = subtotal + shipping;

  useEffect(() => {
    if (!isLoading && items.length === 0) {
      navigate("/cart");
    }
  }, [isLoading, items.length, navigate]);

  if (isLoading) {
    return (
      <Layout onSearch={() => {}} cartItemCount={0}>
        <div className="flex min-h-[60vh] items-center justify-center">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <Layout onSearch={() => {}} cartItemCount={items.length}>
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
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
              />

              <Button
                variant="primary"
                size="lg"
                onClick={() => cart && handlePayment(cart)}
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing
                  ? "처리 중..."
                  : `${total.toLocaleString()}원 결제하기`}
              </Button>
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
