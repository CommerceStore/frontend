import { useNavigate } from "react-router-dom";
import { useCartQuery, useUpdateCartItemMutation, useRemoveCartItemMutation } from "@/features/cart";
import { CartList } from "@/features/cart";
import { CartSummary } from "@/features/cart";
import { Layout } from "@/widgets/layout/Layout";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { calculateCartTotal, calculateShippingFee } from "@/entities/cart";

export function CartPage() {
  const navigate = useNavigate();
  const { data: cart, isLoading, error, refetch } = useCartQuery();
  const updateMutation = useUpdateCartItemMutation();
  const removeMutation = useRemoveCartItemMutation();

  const items = cart?.items ?? [];
  const subtotal = cart ? calculateCartTotal(cart) : 0;
  const shipping = calculateShippingFee(subtotal);
  const total = subtotal + shipping;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (isLoading) {
    return (
      <Layout onSearch={() => {}} cartItemCount={0}>
        <div className="flex min-h-[60vh] items-center justify-center">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout onSearch={() => {}} cartItemCount={0}>
        <div className="mx-auto max-w-7xl px-4 py-16">
          <ErrorMessage
            message={error.message || "장바구니를 불러올 수 없습니다"}
            onRetry={() => refetch()}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout onSearch={() => {}} cartItemCount={items.length}>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-zinc-900">장바구니</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CartList
              items={items}
              onUpdateQuantity={(itemId, quantity) =>
                updateMutation.mutate({ itemId, quantity })
              }
              onRemove={(itemId) => removeMutation.mutate(itemId)}
            />
          </div>

          {items.length > 0 && (
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CartSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  total={total}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
