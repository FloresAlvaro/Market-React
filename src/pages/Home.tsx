import { useState } from "react";
import { useCartStore } from "@store/cartStore";
import { useProducts } from "@hooks/useProducts";
import { usePagination } from "@hooks/usePagination";
import { useSearch } from "@hooks/useSearch";
import { useFilter } from "@hooks/useFilter";
import type { SortOption } from "@components/molecules/FilterPanel";
import { ProductCard, SearchBar, FilterPanel } from "@molecules";
import { MainLayout } from "@templates";
import { LoadingSpinner, ErrorAlert, EmptyState } from "@atoms";
import { Pagination } from "@organisms";

export function Home() {
  const { products, loading, error } = useProducts();
  const { items, addItem } = useCartStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const { results: searchResults } = useSearch(searchQuery, products);
  const filtered = useFilter({
    products: searchResults,
    minPrice,
    maxPrice,
    sortBy,
  });

  const { currentPage, totalPages, paginatedItems, goToPage } = usePagination({
    items: filtered,
    itemsPerPage: 12,
  });

  if (loading) {
    return (
      <MainLayout cartCount={items.length}>
        <LoadingSpinner />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout cartCount={items.length}>
        <ErrorAlert message={error} />
      </MainLayout>
    );
  }

  if (products.length === 0) {
    return (
      <MainLayout cartCount={items.length}>
        <EmptyState />
      </MainLayout>
    );
  }

  return (
    <MainLayout cartCount={items.length}>
      <div className="products-grid">
        <h2>Productos disponibles</h2>
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Buscar por nombre, descripción..."
        />
        <FilterPanel
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={(min, max) => {
            setMinPrice(min);
            setMaxPrice(max);
            goToPage(1); // Volver a página 1 al filtrar
          }}
          onSortChange={(sort) => {
            setSortBy(sort);
            goToPage(1); // Volver a página 1 al cambiar sort
          }}
          currentSort={sortBy}
        />
        {searchQuery && searchResults.length === 0 ? (
          <EmptyState
            title="No hay resultados"
            message={`No encontramos productos para "${searchQuery}"`}
            showButton={false}
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No hay productos"
            message="No encontramos productos que coincidan con los filtros"
            showButton={false}
          />
        ) : (
          <>
            <div className="grid">
              {paginatedItems.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addItem}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}
