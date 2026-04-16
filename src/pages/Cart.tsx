import type { CartItem } from "@app/types/product";
import { useCartStore } from "@store/cartStore";
import { MainLayout } from "@templates";
import { formatPrice } from "@utils/formatPrice";

export function Cart() {
  const { items, removeItem, clearCart } = useCartStore();

  const total = items.reduce(
    (sum: number, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <MainLayout cartCount={items.length}>
      <div className="cart-page">
        <h2>Carrito de compras</h2>
        {items.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item: CartItem) => (
                <div key={item.id} className="cart-item">
                  <h4>{item.name}</h4>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio unitario: {formatPrice(item.price)}</p>
                  <button onClick={() => removeItem(item.id)}>Eliminar</button>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <h3>Total: {formatPrice(total)}</h3>
              <button onClick={clearCart}>Vaciar carrito</button>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
