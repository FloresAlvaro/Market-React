import { Link } from "react-router-dom";
import { MainLayout } from "@templates";
import { useCartStore } from "@store/cartStore";
import { Button } from "@atoms";

export function NotFound() {
  const { items } = useCartStore();

  return (
    <MainLayout cartCount={items.length}>
      <div className="not-found">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Página no encontrada</h2>
          <p>Lo sentimos, la página que buscas no existe.</p>
          <Link to="/">
            <Button label="Volver al inicio" onClick={() => {}} />
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
