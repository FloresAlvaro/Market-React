import { useParams } from "react-router-dom";
import type { Product } from "@app/types/product";
import { useCartStore } from "@store/cartStore";
import { MainLayout } from "@templates";
import { Button } from "@atoms";
import { formatPrice } from "@utils/formatPrice";

// Mock de productos - en producción sería de una API
const mockProducts: { [key: string]: Product } = {
  "1": {
    id: "1",
    name: "Laptop",
    price: 999,
    description:
      "Laptop de alta performance con procesador de última generación",
    image: "https://via.placeholder.com/400",
  },
  "2": {
    id: "2",
    name: "Mouse",
    price: 25,
    description: "Mouse inalámbrico de precisión",
    image: "https://via.placeholder.com/400",
  },
  "3": {
    id: "3",
    name: "Teclado",
    price: 75,
    description: "Teclado mecánico con switches cherry mx",
    image: "https://via.placeholder.com/400",
  },
};

export function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const { addItem } = useCartStore();
  const { items } = useCartStore();

  const product = productId ? mockProducts[productId] : null;

  if (!product) {
    return (
      <MainLayout cartCount={items.length}>
        <div className="product-detail">
          <h2>Producto no encontrado</h2>
          <p>Lo sentimos, el producto que buscas no existe.</p>
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
