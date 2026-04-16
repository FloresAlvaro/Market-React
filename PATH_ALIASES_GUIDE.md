# Path Aliases Guide

## ¿Qué son los Path Aliases?

Son atajos para importar archivos sin usar rutas relativas complicadas como `../../../`. Hacen el código más limpio y legible.

## ANTES vs DESPUÉS

### ❌ Imports confusos (sin aliases)
```typescript
import { Button } from '../../../components/atoms'
import { useProducts } from '../../hooks/useProducts'
import type { Product } from '../../../types/product'
```

### ✅ Imports limpios (con aliases)
```typescript
import { Button } from '@atoms'
import { useProducts } from '@hooks/useProducts'
import type { Product } from '@app/types/product'
```

## Lista Completa de Aliases

| Alias | Apunta a | Uso |
|-------|----------|-----|
| `@/` | `src/` | Cualquier archivo en src |
| `@components/*` | `src/components/*` | Componentes generales |
| `@atoms` | `src/components/atoms` | Componentes atómicos |
| `@molecules` | `src/components/molecules` | Moléculas |
| `@organisms` | `src/components/organisms` | Organismos |
| `@templates` | `src/components/templates` | Plantillas |
| `@hooks/*` | `src/hooks/*` | Custom hooks |
| `@pages/*` | `src/pages/*` | Páginas/Vistas |
| `@services/*` | `src/services/*` | Servicios API |
| `@store/*` | `src/store/*` | Estado global |
| `@app/types/*` | `src/types/*` | Tipos e interfaces |
| `@utils/*` | `src/utils/*` | Funciones helper |
| `@assets/*` | `src/assets/*` | Archivos estáticos |

## Ejemplos de Uso

### Ejemplo 1: Componente que usa múltiples imports
```typescript
// src/components/organisms/ProductGrid.tsx
import { ProductCard } from '@molecules'
import { useProducts } from '@hooks/useProducts'

export function ProductGrid() {
  const { products } = useProducts()
  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### Ejemplo 2: Page con layout y store
```typescript
// src/pages/Shop.tsx
import { MainLayout } from '@templates'
import { ProductGrid } from '@organisms'
import { useCartStore } from '@store/cartStore'

export function Shop() {
  const cartCount = useCartStore((state) => state.items.length)
  return (
    <MainLayout cartCount={cartCount} onCartClick={() => {}}>
      <ProductGrid />
    </MainLayout>
  )
}
```

### Ejemplo 3: Hook con types y services
```typescript
// src/hooks/useFilteredProducts.ts
import { getProducts } from '@services/productService'
import type { Product } from '@app/types/product'

export function useFilteredProducts(category: string) {
  // lógica del hook usando types y services
}
```

### Ejemplo 4: Service que importa types
```typescript
// src/services/userService.ts
import type { User } from '@app/types/user'

export async function getUser(id: string): Promise<User> {
  // implementación
}
```

## Ventajas de Usar Path Aliases

✅ **Imports más legibles** - Sin rutas confusas  
✅ **Refactorización fácil** - Mover carpetas no rompe imports  
✅ **Sin dependencia de profundidad** - El mismo import funciona en cualquier nivel  
✅ **Mejor autocompletado** - El editor entiende mejor la estructura  
✅ **Referencias correctas** - IDE puede seguir enlaces sin problemas  

## Configuración (Ya lista ✓)

La configuración ya está en:
- **tsconfig.app.json** - Aliases para TypeScript
- **vite.config.ts** - Aliases para Vite build

No necesitas hacer nada más. ¡Solo usa los aliases! 🎉
