import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@app/types/product";

interface FavoritesState {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (product: Product) => {
        set((state) => {
          if (!state.favorites.find((p) => p.id === product.id)) {
            return { favorites: [...state.favorites, product] };
          }
          return state;
        });
      },

      removeFavorite: (productId: string) => {
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== productId),
        }));
      },

      isFavorite: (productId: string) => {
        return get().favorites.some((p) => p.id === productId);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: "favorites-storage",
    },
  ),
);
