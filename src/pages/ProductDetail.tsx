import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "@app/types/product";
import { useCartStore } from "@store/cartStore";
import { MainLayout } from "@templates";
import { Button } from "@atoms";
import { formatPrice } from "@utils/formatPrice";
import { getProductById } from "@services/productService";

export function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const { addItem } = useCartStore();
  const { items } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("ID de producto inválido");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const fetchedProduct = await getProductById(productId);

        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setError(null);
        } else {
          setError("Producto no encontrado");
          setProduct(null);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Error al cargar el producto");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <MainLayout cartCount={items.length}>
        <div className="product-detail">
          <h2>Cargando producto...</h2>
        </div>
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout cartCount={items.length}>
        <div className="product-detail">
          <h2>Producto no encontrado</h2>
          <p>{error || "Lo sentimos, el producto que buscas no existe."}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout cartCount={items.length}>
      <div className="product-detail">
        <div className="product-detail-container">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="price">{formatPrice(product.price)}</p>
            <p className="description">{product.description}</p>
            <div className="product-actions">
              <Button
                label="Agregar al carrito"
                onClick={() => addItem(product)}
                variant="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
