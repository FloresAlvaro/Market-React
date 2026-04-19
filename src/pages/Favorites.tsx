import { Box, Button } from "@mui/material";
import { useFavoritesStore } from "@store/favoritesStore";
import { useCartStore } from "@store/cartStore";
import { ProductCard } from "@molecules";
import { MainLayout } from "@templates";
import { EmptyState } from "@atoms";

export function Favorites() {
  const { favorites, clearFavorites } = useFavoritesStore();
  const { items, addItem } = useCartStore();

  if (favorites.length === 0) {
    return (
      <MainLayout cartCount={items.length}>
        <Box sx={{ padding: "40px 20px" }}>
          <EmptyState
            title="No hay favoritos"
            message="Aún no has agregado ningún producto a favoritos"
          />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout cartCount={items.length}>
      <div className="products-grid">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h2>Mis Favoritos ({favorites.length})</h2>
          <Button
            variant="outlined"
            color="error"
            onClick={clearFavorites}
            size="small"
          >
            Limpiar todos
          </Button>
        </Box>

        <div className="grid">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addItem}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
