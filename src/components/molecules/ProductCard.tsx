import { Link } from "react-router-dom";
import type { Product } from "@app/types/product";
import { Button } from "@atoms";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </Link>
      <p className="price">${product.price}</p>
      <Button
        label="Agregar al carrito"
        onClick={() => onAddToCart(product)}
        variant="primary"
      />
    </div>
  );
}
