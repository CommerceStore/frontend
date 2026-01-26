import { useMemo, useState } from "react";
import { useProductsQuery } from "@/features/products/api/useProductsQuery";
import { ProductsGrid } from "@/features/products/ui/ProductsGrid";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { EmptyState } from "@/shared/ui/EmptyState";
import { ProductsGridSkeleton } from "@/shared/ui/Skeleton";
import { CategoryFilter } from "@/shared/ui/CategoryFilter";
import { SortFilter } from "@/shared/ui/SortFilter";
import { Layout } from "@/widgets/layout/Layout";
import { MainBanner } from "@/widgets/ui/MainBanner";
import type { SortOption } from "@/entities/product/types";

export function ProductsPage() {
  const { data: products, isLoading, error, refetch } = useProductsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  const categories = useMemo(() => {
    if (!products) return [];
    const uniqueCategories = new Set(products.map((p) => p.category));
    return Array.from(uniqueCategories).sort();
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
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

    // 정렬 적용
    const sorted = [...filtered];
    switch (sortOption) {
      case "newest":
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "popularity":
        // 실제로는 API에서 인기도를 받아와야 하지만, 여기서는 재고가 많은 순으로 정렬
        sorted.sort((a, b) => b.stock - a.stock);
        break;
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
    }

    return sorted;
  }, [products, selectedCategory, searchQuery, sortOption]);

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

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-end gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl">
                {selectedCategory || "전체 상품"}
              </h2>
              {products && (
                <span className="pb-1 text-sm font-medium text-zinc-500">
                  {filteredAndSortedProducts.length.toLocaleString()}개
                </span>
              )}
            </div>

            {!isLoading && products && (
              <SortFilter
                selectedSort={sortOption}
                onSortChange={setSortOption}
              />
            )}
          </div>

          {isLoading && <ProductsGridSkeleton count={8} />}

          {error && (
            <ErrorMessage
              message={error.message || "상품 목록을 불러올 수 없습니다"}
              onRetry={() => refetch()}
            />
          )}

          {!isLoading && !error && filteredAndSortedProducts.length === 0 && (
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

          {!isLoading && !error && filteredAndSortedProducts.length > 0 && (
            <ProductsGrid
              products={filteredAndSortedProducts}
              onProductClick={handleProductClick}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
