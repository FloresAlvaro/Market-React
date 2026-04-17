// Tipos para la API de Vinted

export interface VintedItem {
  id: number;
  title: string;
  price: number;
  currency: string;
  description: string;
  photo?: {
    thumb_url?: string;
    url?: string;
    high_resolution_url?: string;
  };
  photos?: Array<{
    thumb_url?: string;
    url?: string;
    high_resolution_url?: string;
  }>;
  user: {
    id: number;
    login: string;
  };
  status: string;
  size?: string;
  brand?: string;
  color?: string[];
  material?: string[];
}

export interface VintedApiResponse {
  success: boolean;
  data: {
    items: VintedItem[];
    pagination: {
      page: number;
      per_page: number;
      total_entries: number;
      total_pages: number;
    };
  };
}
