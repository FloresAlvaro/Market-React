# Market - React + Vite + Atomic Design

Proyecto de e-commerce con arquitectura de **Atomic Design**.

## 📁 Estructura del Proyecto

```
src/
├── assets/             # Imágenes, SVGs, fuentes
├── components/         # Componentes organizados por Atomic Design
│   ├── atoms/          # Botones, Inputs, Badges, Spinners
│   ├── molecules/      # SearchBar, FormField, CartItem, ProductCard
│   ├── organisms/      # Navbar, ProductGrid, Footer, CheckoutForm
│   ├── templates/      # MainLayout, AuthLayout, ShopLayout
│   └── index.ts        # Exportación global de componentes
├── hooks/              # Custom hooks (useCart, useAuth, useProducts)
├── pages/              # Vistas finales (Home.tsx, Product.tsx, Cart.tsx)
├── services/           # Llamadas a API (productService, etc)
├── store/              # Estado global con Zustand
├── types/              # Definiciones de interfaces TypeScript
├── utils/              # Funciones de ayuda (formatPrice, formatDate)
├── App.tsx             # Punto de entrada de la UI
├── App.css             # Estilos de la aplicación
├── index.css           # Estilos globales
└── main.tsx            # Punto de entrada principal
```

## 🚀 Quick Start

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## 📦 Dependencias Principales

- **React 19** - UI Library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Zustand** - State management
- **ESLint** - Code quality

## 🎯 Atomic Design

Este proyecto sigue la metodología de **Atomic Design** que organiza los componentes de la siguiente manera:

### Atoms (Átomos)
Componentes básicos e indivisibles:
- `Button` - Botón reutilizable
- `Badge` - Etiqueta con estilos
- `Input` - Campo de entrada (pendiente)

### Molecules (Moléculas)
Combinaciones de átomos que forman unidades funcionales:
- `ProductCard` - Tarjeta de producto con imagen, nombre y botón
- `SearchBar` - Barra de búsqueda (pendiente)

### Organisms (Organismos)
Combinaciones complejas de moléculas:
- `Navbar` - Barra de navegación con carrito
- `ProductGrid` - Grid de productos
- `Footer` - Pie de página (pendiente)

### Templates (Plantillas)
Estructuras de página que combinan organismos:
- `MainLayout` - Layout principal con Navbar
- `AuthLayout` - Layout para autenticación (pendiente)

### Pages (Páginas)
Vistas finales usando templates:
- `Home` - Página de inicio con listado de productos
- `Cart` - Página del carrito de compras

## 📚 Ejemplo: Agregar un Nuevo Componente

### 1. Crear un Atom

```typescript
// src/components/atoms/Input.tsx
interface InputProps {
  type: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export function Input({ type, placeholder, value, onChange }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input"
    />
  )
}
```

### 2. Exportar en index.ts

```typescript
// src/components/atoms/index.ts
export { Button } from './Button'
export { Badge } from './Badge'
export { Input } from './Input'  // Nuevo
```

### 3. Usar en una Molécula

```typescript
// src/components/molecules/SearchBar.tsx
import { Input, Button } from '../atoms'

export function SearchBar() {
  return (
    <div className="search-bar">
      <Input type="text" placeholder="Buscar..." value="" onChange={() => {}} />
      <Button label="Buscar" onClick={() => {}} />
    </div>
  )
}
```

## 🎨 Convenciones de Código

- **Componentes**: `PascalCase` (ej: `ProductCard.tsx`)
- **Funciones/Variables**: `camelCase` (ej: `formatPrice.ts`)
- **Tipos/Interfaces**: `PascalCase` (ej: `Product.ts`)
- **Carpetas**: `lowercase` (ej: `atoms`, `molecules`)

## 🔧 Próximos Pasos

- [ ] Agregar más Atoms (Input, Select, etc)
- [ ] Implementar páginas de detalle de producto
- [ ] Agregar autenticación
- [ ] Integrar API real
- [ ] Agregar tests
- [ ] Mejorar estilos CSS

---

**Desarrollado con ❤️ usando React, Vite y Atomic Design**
