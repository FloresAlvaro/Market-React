import { Link } from "react-router-dom";
import { useState } from "react";
import { Box } from "@mui/material";
import type { Product } from "@app/types/product";
import { Button, FavoriteButton } from "@atoms";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Box className="product-card" sx={{ position: "relative" }}>
      <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 10 }}>
        <FavoriteButton product={product} size="medium" />
      </Box>
      <Link to={`/product/${product.id}`}>
        {imageError ? (
          <div
            style={{
              width: "100%",
              height: "200px",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999",
            }}
          >
            No hay imagen
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
          />
        )}
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </Link>
      <p className="price">${product.price}</p>
      <Button
        label="Agregar al carrito"
        onClick={() => onAddToCart(product)}
        variant="primary"
      />
    </Box>
  );
}
