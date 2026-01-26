import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/entities/product/api';

export function useProductsQuery() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
}
