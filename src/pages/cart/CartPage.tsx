import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/features/cart";
import { CartList } from "@/features/cart";
import { CartSummary } from "@/features/cart";
import { Layout } from "@/widgets/layout/Layout";
import { calculateShippingFee } from "@/entities/cart";

export function CartPage() {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotal = useCartStore((state) => state.getTotal);

  const subtotal = getTotal();
  const shipping = calculateShippingFee(subtotal);
  const total = subtotal + shipping;
  const cartItemCount = cart.items.length;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const isEmpty = cart.items.length === 0;

  return (
    <Layout onSearch={() => {}} cartItemCount={cartItemCount}>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-zinc-900">장바구니</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CartList
              items={cart.items}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          </div>

          {!isEmpty && (
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
