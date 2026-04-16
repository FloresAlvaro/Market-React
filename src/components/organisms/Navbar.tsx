import { Link } from "react-router-dom";
import { Badge } from "@atoms";

interface NavbarProps {
  cartCount: number;
}

export function Navbar({ cartCount }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <h1>Market</h1>
        </Link>
        <Link to="/cart" className="cart-btn">
          🛒 Carrito
          {cartCount > 0 && (
            <Badge label={cartCount.toString()} color="danger" />
          )}
        </Link>
      </div>
    </nav>
  );
}
