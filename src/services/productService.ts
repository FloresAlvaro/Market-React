import type { Product } from "@app/types/product";
import type { VintedItem } from "@app/types/vinted";
import vintedApi from "./vintedApi";

// Cache de productos para evitar búsquedas repetidas
const productCache: Map<string, Product> = new Map();

// Mapear respuesta de Vinted a nuestro formato de Product
function mapVintedItemToProduct(item: VintedItem): Product {
  // Buscar la imagen en diferentes ubicaciones posibles
  let imageUrl = "https://via.placeholder.com/300x300?text=Sin+imagen";

  // Primero intentar con photo object
  if (item.photo) {
    imageUrl =
      item.photo.url ||
      item.photo.thumb_url ||
      item.photo.high_resolution_url ||
      imageUrl;
  }

  // Si aún no tenemos imagen, buscar en photos array
  if (
    imageUrl === "https://via.placeholder.com/300x300?text=Sin+imagen" &&
    item.photos &&
    Array.isArray(item.photos) &&
    item.photos.length > 0
  ) {
    const firstPhoto = item.photos[0];
    imageUrl =
      firstPhoto.url ||
      firstPhoto.thumb_url ||
      firstPhoto.high_resolution_url ||
      imageUrl;
  }

  return {
    id: String(item.id),
    name: item.title || "Sin nombre",
    price: item.price || 0,
    description: item.description || "Sin descripción disponible",
    image: imageUrl,
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    // Realizar búsqueda en Vinted
    const response = await vintedApi.get("/getSearch", {
      params: {
        country: "us",
        page: "1",
        order: "newest_first",
        per_page: "50", // Obtener más productos por página
      },
    });

    console.log("Vinted API Response:", response.data); // Debug

    if (response.data?.data?.items && Array.isArray(response.data.data.items)) {
      const products = response.data.data.items.map(mapVintedItemToProduct);

      // Guardar en cache
      products.forEach((product: Product) => {
        productCache.set(product.id, product);
      });

      console.log("Mapped Products:", products); // Debug
      return products;
    }

    return getMockProducts(); // Si falla, retornar mock
  } catch (error) {
    console.error("Error fetching products from Vinted API:", error);
    return getMockProducts(); // Fallback a datos mock
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    // Primero verificar si está en cache
    if (productCache.has(id)) {
      return productCache.get(id) || null;
    }

    // Si no está en cache, obtener todos los productos
    // Esto también llenará el cache
    const allProducts = await getProducts();

    // Buscar en la lista
    const product = allProducts.find((p) => p.id === id);

    if (product) {
      productCache.set(id, product);
      return product;
    }

    // Si aún no lo encontramos, devolver de los mock
    const mockProduct = getMockProducts().find((p) => p.id === id);
    return mockProduct || null;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return getMockProducts().find((p) => p.id === id) || null;
  }
}

// Datos mock como fallback
function getMockProducts(): Product[] {
  return [
    {
      id: "1",
      name: "Laptop MacBook Pro 13",
      price: 999.99,
      description: "Laptop de alta performance con procesador Apple M2",
      image: "https://via.placeholder.com/300x300?text=MacBook+Pro",
    },
    {
      id: "2",
      name: "iPhone 14 Pro",
      price: 749.99,
      description: "Smartphone flagship con cámara profesional",
      image: "https://via.placeholder.com/300x300?text=iPhone+14",
    },
    {
      id: "3",
      name: "AirPods Pro",
      price: 249.99,
      description: "Auriculares inalámbricos con cancelación de ruido",
      image: "https://via.placeholder.com/300x300?text=AirPods",
    },
    {
      id: "4",
      name: "iPad Air",
      price: 599.99,
      description: "Tablet 10.9 pulgadas con pantalla Retina",
      image: "https://via.placeholder.com/300x300?text=iPad+Air",
    },
    {
      id: "5",
      name: "Apple Watch Series 8",
      price: 399.99,
      description: "Reloj inteligente con monitoreo de salud avanzado",
      image: "https://via.placeholder.com/300x300?text=Apple+Watch",
    },
    {
      id: "6",
      name: "Samsung Galaxy S23",
      price: 899.99,
      description: "Smartphone Android con pantalla AMOLED 6.1 pulgadas",
      image: "https://via.placeholder.com/300x300?text=Samsung+Galaxy",
    },
    {
      id: "7",
      name: "Sony WH-1000XM5",
      price: 349.99,
      description: "Auriculares over-ear con cancelación de ruido",
      image: "https://via.placeholder.com/300x300?text=Sony+WH",
    },
    {
      id: "8",
      name: "DJI Mini 3 Pro",
      price: 649.99,
      description: "Dron compacto con cámara 4K",
      image: "https://via.placeholder.com/300x300?text=DJI+Drone",
    },
    {
      id: "9",
      name: "Nintendo Switch OLED",
      price: 349.99,
      description: "Consola de videojuegos portátil con pantalla OLED",
      image: "https://via.placeholder.com/300x300?text=Nintendo+Switch",
    },
    {
      id: "10",
      name: "GoPro Hero 11",
      price: 499.99,
      description: "Cámara de acción 4K con estabilización",
      image: "https://via.placeholder.com/300x300?text=GoPro+Hero",
    },
    {
      id: "11",
      name: "Samsung 65 QLED TV",
      price: 1299.99,
      description: "Televisor 4K con tecnología quantum dot",
      image: "https://via.placeholder.com/300x300?text=Samsung+TV",
    },
    {
      id: "12",
      name: "Bose SoundLink Max",
      price: 449.99,
      description: "Altavoz Bluetooth portátil premium",
      image: "https://via.placeholder.com/300x300?text=Bose+Speaker",
    },
  ];
}
