# Integración con API de Amazon - RapidAPI

## 🔌 Configuración de la API

Se ha integrado la API de **Real-time Amazon Data** desde RapidAPI para obtener productos reales de Amazon.

### Archivos Configurados

```
src/
├── services/
│   ├── amazonApi.ts         # Cliente Axios configurado
│   └── productService.ts    # Funciones para obtener productos
├── types/
│   └── amazon.ts            # Tipos de la API de Amazon
└── hooks/
    └── useProducts.ts       # Hook para usar productos
```

## 🔐 Variables de Entorno

Las claves de API están en `.env` (no compartir públicamente):

```env
VITE_RAPIDAPI_KEY=tu_clave_aqui
VITE_RAPIDAPI_HOST=real-time-amazon-data.p.rapidapi.com
```

**⚠️ IMPORTANTE:** Nunca commits `.env` a Git. Usa `.env.example` como plantilla.

## 📡 Cómo Funciona

### 1. Cliente Axios Configurado

```typescript
// src/services/amazonApi.ts
import amazonApi from '@services/amazonApi'

// El cliente ya tiene:
// - Headers configurados automáticamente
// - Manejo de errores global
// - Transformación de datos
```

### 2. Funciones del Servicio

```typescript
// src/services/productService.ts

// Obtener todos los productos
export async function getProducts(): Promise<Product[]>

// Obtener un producto por ID (ASIN)
export async function getProductById(id: string): Promise<Product | null>
```

### 3. Hook para Consumir en Componentes

```typescript
import { useProducts } from '@hooks/useProducts'

export function Home() {
  const { products, loading, error, retry } = useProducts()

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} onRetry={retry} />

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

## 🔄 Flujo de Datos

```
Componente (Home.tsx)
    ↓ usa
useProducts() hook
    ↓ llama
getProducts() function
    ↓ usa
amazonApi client
    ↓ HTTP GET
RapidAPI → Amazon
    ↓ respuesta JSON
mapAmazonProductToProduct()
    ↓ devuelve
Product[]
```

## 📦 Estructura de Respuesta de la API

La API devuelve datos como:

```json
{
  "status": "success",
  "data": {
    "asin": "B09SM24S8C",
    "product_title": "Nombre del Producto",
    "product_price": "$99.99",
    "product_description": "Descripción...",
    "product_photo": "https://...",
    "offers": [
      {
        "asin": "...",
        "product_title": "...",
        "product_price": "...",
        ...
      }
    ]
  }
}
```

Que se transforma a nuestro formato `Product`:

```typescript
interface Product {
  id: string              // ASIN
  name: string           // product_title
  price: number          // product_price (parseado)
  description: string    // product_description
  image: string          // product_photo
}
```

## 🛡️ Manejo de Errores

El sistema tiene **3 niveles de protección**:

### 1. Error en Cliente Axios
```typescript
// amazonApi.ts - Interceptor global
amazonApi.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data)
    return Promise.reject(error)
  }
)
```

### 2. Error en Servicio
```typescript
// productService.ts
try {
  // Llamada a API
} catch (error) {
  console.error('Error fetching products:', error)
  return getMockProducts() // Fallback
}
```

### 3. Error en Hook
```typescript
// useProducts.ts
try {
  const data = await getProducts()
} catch (err) {
  setError(err.message)
  console.error('Error en useProducts:', err)
}
```

## 🔄 Reintentos

El hook `useProducts` incluye un método `retry`:

```typescript
export function Home() {
  const { products, loading, error, retry } = useProducts()

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={retry}>Reintentar</button>
      </div>
    )
  }

  return <ProductList products={products} />
}
```

## 📝 ASINs Configurados

Por defecto se usan estos ASINs (productos de Amazon):

```typescript
const productAsins = [
  'B09SM24S8C', // Producto 1
  'B0BVQQX6KY', // Producto 2
  'B08HYSMGYC', // Producto 3
  'B09YJL5D5C', // Producto 4
  'B0B4JHCJL2', // Producto 5
]
```

**Para cambiar productos:**

1. Obtén el ASIN de un producto de Amazon (en la URL)
2. Agrega el ASIN a `productAsins` en `productService.ts`
3. El sistema obtiene automáticamente los datos

## 🚀 Mejoras Futuras

- [ ] Caché de datos (localStorage o IndexedDB)
- [ ] Paginación de productos
- [ ] Búsqueda por palabra clave
- [ ] Filtros y ordenamiento
- [ ] Sincronización automática cada X minutos
- [ ] Indicador de stock disponible
- [ ] Comparador de precios

## ⚠️ Limitaciones de RapidAPI

- **Límite de peticiones:** Depende del plan (Free: 100/mes)
- **Latencia:** Las peticiones pueden tardar 1-2 segundos
- **Datos limitados:** Solo algunos productos tienen información completa

## 🔧 Pruebas

Para probar en componentes:

```typescript
import { useProducts } from '@hooks/useProducts'

export function TestComponent() {
  const { products, loading, error } = useProducts()

  console.log('Products:', products)
  console.log('Loading:', loading)
  console.log('Error:', error)

  return <pre>{JSON.stringify({ products, loading, error }, null, 2)}</pre>
}
```

## 📚 Referencias

- [RapidAPI - Real-time Amazon Data](https://rapidapi.com/letscrape-6bam/api/real-time-amazon-data)
- [Axios Documentation](https://axios-http.com/)
- [Amazon ASIN](https://sellercentral.amazon.com/gp/help/external/help.html?itemID=2)

---

**¡La integración con la API está lista!** 🎉
