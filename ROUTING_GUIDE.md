# React Router - Guía de Rutas

## 🛣️ Sistema de Rutas Configurado

Tu aplicación ahora tiene navegación completa con **React Router DOM**. Las rutas están centralizadas en `src/router.tsx`.

## 📍 Rutas Disponibles

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | `Home` | Listado de productos |
| `/product/:productId` | `ProductDetail` | Detalle de un producto específico |
| `/cart` | `Cart` | Carrito de compras |
| `*` | `NotFound` | Página 404 (cualquier otra ruta) |

## 🧭 Cómo Navegar Entre Páginas

### 1. Usando `<Link>` en componentes

El `<Link>` es el método recomendado para navegación interna:

```typescript
import { Link } from 'react-router-dom'

export function MyComponent() {
  return (
    <>
      <Link to="/">Inicio</Link>
      <Link to="/cart">Carrito</Link>
      <Link to="/product/1">Ver Producto</Link>
    </>
  )
}
```

### 2. Usando `useNavigate()` para navegación programática

Cuando necesitas navegar desde un evento o efecto:

```typescript
import { useNavigate } from 'react-router-dom'

export function MyComponent() {
  const navigate = useNavigate()

  const handleClick = () => {
    // Hacer algo...
    navigate('/cart')
  }

  return <button onClick={handleClick}>Ir al carrito</button>
}
```

## 📂 Estructura de Archivos de Rutas

```
src/
├── router.tsx              # ← Configuración de rutas (punto central)
├── pages/
│   ├── Home.tsx           # Página principal
│   ├── ProductDetail.tsx  # Detalle del producto
│   ├── Cart.tsx           # Carrito
│   └── NotFound.tsx       # 404
└── App.tsx                # ← Usa RouterProvider
```

## 🔄 Flujo de Navegación

```
Home (/) 
  ↓ Click en producto
ProductDetail (/product/:productId)
  ↓ Click "Agregar al carrito" o botón carrito en navbar
  ↓
Cart (/cart)
  ↓ Click "Volver al inicio" (a través del navbar)
  ↓
Home (/)
```

## 💡 Ejemplos de Uso

### Ejemplo 1: Navegar desde una lista de productos

```typescript
// src/components/molecules/ProductCard.tsx
import { Link } from 'react-router-dom'

export function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
    </div>
  )
}
```

### Ejemplo 2: Navegar al carrito desde el navbar

```typescript
// src/components/organisms/Navbar.tsx
import { Link } from 'react-router-dom'

export function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <Link to="/">Market</Link>
      <Link to="/cart">
        🛒 Carrito ({cartCount})
      </Link>
    </nav>
  )
}
```

### Ejemplo 3: Navegación programática

```typescript
// src/pages/Cart.tsx
import { useNavigate } from 'react-router-dom'

export function Cart() {
  const navigate = useNavigate()

  const handleCheckout = () => {
    // Procesar compra...
    alert('Compra realizada!')
    navigate('/') // Redirigir a inicio
  }

  return <button onClick={handleCheckout}>Finalizar compra</button>
}
```

## 🔗 Acceder a Parámetros de Ruta

Para obtener parámetros dinámicos como `productId`:

```typescript
import { useParams } from 'react-router-dom'

export function ProductDetail() {
  const { productId } = useParams<{ productId: string }>()
  
  // productId contiene el ID de la URL: /product/123 → productId = "123"
  
  return <div>Mostrando producto: {productId}</div>
}
```

## 📊 Query Parameters

Para parámetros en la URL como `?sort=price&filter=electronics`:

```typescript
import { useSearchParams } from 'react-router-dom'

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const sort = searchParams.get('sort')
  const filter = searchParams.get('filter')
  
  return (
    <div>
      <Link to="/?sort=price&filter=electronics">
        Filtrado
      </Link>
    </div>
  )
}
```

## 🔄 Actualizar rutas cuando se agregue nueva funcionalidad

### Agregar una nueva página (ej: Login)

1. Crear el archivo: `src/pages/Login.tsx`
2. Agregar la ruta en `src/router.tsx`:

```typescript
export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/product/:productId', element: <ProductDetail /> },
  { path: '/cart', element: <Cart /> },
  { path: '/login', element: <Login /> }, // ← Nueva ruta
  { path: '*', element: <NotFound /> },
])
```

3. Usar en componentes:

```typescript
import { Link } from 'react-router-dom'

<Link to="/login">Ingresar</Link>
```

## 🎯 Buenas Prácticas

✅ Usa `<Link>` para navegación interna  
✅ Usa `useNavigate()` para navegación programática  
✅ Mantén las rutas centralizadas en `router.tsx`  
✅ Usa `useParams()` para parámetros dinámicos  
✅ Crea una página 404 para rutas no encontradas  
✅ Usa rutas anidadas para layouts complejos  

## 📚 Recursos Adicionales

- [React Router Docs](https://reactrouter.com/)
- [useParams Hook](https://reactrouter.com/en/main/hooks/use-params)
- [useNavigate Hook](https://reactrouter.com/en/main/hooks/use-navigate)
- [Link Component](https://reactrouter.com/en/main/components/link)

---

**¡Tu aplicación ahora tiene navegación profesional!** 🚀
