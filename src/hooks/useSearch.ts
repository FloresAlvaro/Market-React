import { useMemo } from "react";
import type { Product } from "@app/types/product";

export function useSearch(query: string, products: Product[]) {
  const results = useMemo(() => {
    if (!query.trim()) {
      return products;
    }

    const lowerQuery = query.toLowerCase();
    return products.filter((product) => {
      const name = product.name.toLowerCase();
      const description = product.description.toLowerCase();
      return name.includes(lowerQuery) || description.includes(lowerQuery);
    });
  }, [query, products]);

  return {
    results,
    count: results.length,
    hasResults: results.length > 0,
  };
}
