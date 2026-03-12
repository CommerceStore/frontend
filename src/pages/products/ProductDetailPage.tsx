import { useParams, useNavigate } from "react-router-dom";
import { useProductQuery } from "@/features/product-detail/api/useProductQuery";
import { ProductDetail } from "@/features/product-detail/ui/ProductDetail";
import { Layout } from "@/widgets/layout/Layout";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { EmptyState } from "@/shared/ui/EmptyState";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import { useCartStore } from "@/features/cart";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error, refetch } = useProductQuery(id!);
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItemCount = useCartStore((state) => state.cart.items.length);

  const handleAddToCart = (quantity: number) => {
    if (!product) return;
    addToCart(product, quantity);
    alert(`${product.name} ${quantity}개를 장바구니에 추가했습니다`);
  };

  const handleBuyNow = (quantity: number) => {
    alert(`${quantity}개 바로 구매 기능은 준비 중입니다`);
  };

  return (
    <Layout onSearch={() => {}} cartItemCount={cartItemCount}>
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            상품 목록으로
          </button>
        </div>

        {isLoading && (
          <div className="flex min-h-[60vh] items-center justify-center">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div className="mx-auto max-w-7xl px-4 py-16">
            <ErrorMessage
              message={error.message || "상품 정보를 불러올 수 없습니다"}
              onRetry={() => refetch()}
            />
          </div>
        )}

        {!isLoading && !error && !product && (
          <div className="mx-auto max-w-7xl px-4 py-16">
            <EmptyState
              message="상품을 찾을 수 없습니다"
              description="요청하신 상품이 존재하지 않거나 삭제되었습니다"
            />
          </div>
        )}

        {!isLoading && !error && product && (
          <ProductDetail
            product={product}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        )}
      </div>
    </Layout>
  );
}
