import { useMemo, useState } from "react";
import { useProductsQuery } from "@/features/products/api/useProductsQuery";
import { ProductsGrid } from "@/features/products/ui/ProductsGrid";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { EmptyState } from "@/shared/ui/EmptyState";
import { ProductsGridSkeleton } from "@/shared/ui/Skeleton";
import { CategoryFilter } from "@/shared/ui/CategoryFilter";
import { Layout } from "@/widgets/layout/Layout";
import { MainBanner } from "@/widgets/ui/MainBanner";

export function ProductsPage() {
  const { data: products, isLoading, error, refetch } = useProductsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    if (!products) return [];
    const uniqueCategories = new Set(products.map((p) => p.category));
    return Array.from(uniqueCategories).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [products, selectedCategory, searchQuery]);

  const handleProductClick = (_productId: string) => {
    // 다음 단계에서 상세 페이지 라우팅 구현 예정
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Layout onSearch={handleSearch} cartItemCount={0}>
      <div className="min-h-screen bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <MainBanner />

          {!isLoading && categories.length > 0 && (
            <div className="mb-8">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          )}

          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl">
              {selectedCategory || "전체 상품"}
            </h2>
            {products && (
              <span className="text-sm font-medium text-zinc-500">
                {filteredProducts.length.toLocaleString()}개의 상품
              </span>
            )}
          </div>

          {isLoading && <ProductsGridSkeleton count={8} />}

          {error && (
            <ErrorMessage
              message={error.message || "상품 목록을 불러올 수 없습니다"}
              onRetry={() => refetch()}
            />
          )}

          {!isLoading && !error && filteredProducts.length === 0 && (
            <EmptyState
              message={
                searchQuery || selectedCategory
                  ? "검색 결과가 없습니다"
                  : "등록된 상품이 없습니다"
              }
              description={
                searchQuery || selectedCategory
                  ? "다른 검색어나 카테고리를 시도해보세요"
                  : "곧 새로운 상품이 등록될 예정입니다"
              }
            />
          )}

          {!isLoading && !error && filteredProducts.length > 0 && (
            <ProductsGrid
              products={filteredProducts}
              onProductClick={handleProductClick}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
