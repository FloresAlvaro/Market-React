import type { Product } from '@app/types/product'

// Ejemplo con datos mock. En producción, usar Fetch o Axios
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop',
    price: 999,
    description: 'Laptop de alta performance',
    image: 'https://via.placeholder.com/200',
  },
  {
    id: '2',
    name: 'Mouse',
    price: 25,
    description: 'Mouse inalámbrico',
    image: 'https://via.placeholder.com/200',
  },
  {
    id: '3',
    name: 'Teclado',
    price: 75,
    description: 'Teclado mecánico',
    image: 'https://via.placeholder.com/200',
  },
]

export async function getProducts(): Promise<Product[]> {
  // Simular delay de API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts)
    }, 300)
  })
}

export async function getProductById(id: string): Promise<Product | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find((p) => p.id === id)
      resolve(product || null)
    }, 300)
  })
}
