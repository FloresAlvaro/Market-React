import { useCartStore } from "@store/cartStore";
import { useProducts } from "@hooks/useProducts";
import { ProductCard } from "@molecules";
import { MainLayout } from "@templates";

export function Home() {
  const { products, loading, error } = useProducts();
  const { items, addItem } = useCartStore();

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <MainLayout cartCount={items.length}>
      <div className="products-grid">
        <h2>Productos disponibles</h2>
        <div className="grid">
          {products.map((product) => (
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
