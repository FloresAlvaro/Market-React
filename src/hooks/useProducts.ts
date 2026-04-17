import { useEffect, useState } from "react";
import type { Product } from "@app/types/product";
import { getProducts } from "@services/productService";

interface UseProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function useProducts(): UseProductsState {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      console.error("Error en useProducts:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    retry: fetchProducts,
  };
}
