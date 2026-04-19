import { useMemo } from "react";
import type { Product } from "@app/types/product";
import type { SortOption } from "@components/molecules/FilterPanel";

interface UseFilterProps {
  products: Product[];
  minPrice: number;
  maxPrice: number;
  sortBy: SortOption;
}

export function useFilter({
  products,
  minPrice,
  maxPrice,
  sortBy,
}: UseFilterProps) {
  const filtered = useMemo(() => {
    const result = [...products].filter(
      (product) => product.price >= minPrice && product.price <= maxPrice,
    );

    // Aplicar ordenamiento
    switch (sortBy) {
      case "price_low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        // Mantener orden original (más nuevo primero)
        break;
    }

    return result;
  }, [products, minPrice, maxPrice, sortBy]);

  return filtered;
}
