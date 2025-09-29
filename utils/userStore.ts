import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getItem, setItem, deleteItemAsync } from 'expo-secure-store';
import { Shop } from '@/hooks/useShops';

export interface UserDetails {
  favoriteShops: Shop[];
  addFavoriteShop: (shop: Shop) => void;
  removeFavoriteShop: (shop: Shop) => void;
  clearFavoriteShops: () => void;
}

export const useUserStore = create(
  persist<UserDetails>(
    (set) => ({
      favoriteShops: [],
      addFavoriteShop: (shop: Shop) => {
        set((state) => {
          const exists = state.favoriteShops.some((s) => s.id === shop.id);
          if (exists) return state;
          return { favoriteShops: [...state.favoriteShops, shop] };
        });
      },
      removeFavoriteShop: (shop: Shop) => {
        set((state) => ({ favoriteShops: state.favoriteShops.filter((s) => s.id !== shop.id) }));
      },
      clearFavoriteShops: () => {
        set({ favoriteShops: [] });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => ({
        getItem,
        setItem,
        removeItem: deleteItemAsync,
      })),
    }
  )
);
