import { Link } from "react-router-dom";
import { Badge } from "@atoms";
import { useFavoritesStore } from "@store/favoritesStore";

interface NavbarProps {
  cartCount: number;
}

export function Navbar({ cartCount }: NavbarProps) {
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <h1>Market</h1>
        </Link>
        <div className="navbar-links">
          <Link to="/favorites" className="favorites-btn">
            ❤️ Favoritos
            {favorites.length > 0 && (
              <Badge label={favorites.length.toString()} color="danger" />
            )}
          </Link>
          <Link to="/cart" className="cart-btn">
            🛒 Carrito
            {cartCount > 0 && (
              <Badge label={cartCount.toString()} color="danger" />
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
