import { IconButton, Tooltip } from "@mui/material";
import { useFavoritesStore } from "@store/favoritesStore";
import type { Product } from "@app/types/product";

interface FavoriteButtonProps {
  product: Product;
  size?: "small" | "medium" | "large";
}

export function FavoriteButton({
  product,
  size = "medium",
}: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const favorite = isFavorite(product.id);

  const handleClick = () => {
    if (favorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return (
    <Tooltip title={favorite ? "Remover de favoritos" : "Agregar a favoritos"}>
      <IconButton
        onClick={handleClick}
        size={size}
        sx={{
          color: favorite ? "error.main" : "action.disabled",
          transition: "all 0.2s ease",
          "&:hover": {
            color: "error.main",
            transform: "scale(1.2)",
          },
        }}
      >
        {favorite ? "❤️" : "🤍"}
      </IconButton>
    </Tooltip>
  );
}
