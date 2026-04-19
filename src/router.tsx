import { createBrowserRouter } from "react-router-dom";
import { Home } from "@pages/Home";
import { Cart } from "@pages/Cart";
import { Favorites } from "@pages/Favorites";
import { ProductDetail } from "@pages/ProductDetail";
import { NotFound } from "@pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product/:productId",
    element: <ProductDetail />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
