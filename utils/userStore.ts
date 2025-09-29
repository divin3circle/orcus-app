import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getItem, setItem, deleteItemAsync } from 'expo-secure-store';
import { Shop } from '@/hooks/useShops';

export interface UserDetails {
  favoriteShops: Shop[];
  addFavoriteShop: (shop: Shop) => void;
  removeFavoriteShop: (shop: Shop) => void;
  clearFavoriteShops: () => void;
  isLoading: boolean;
}

export const useUserStore = create(
  persist<UserDetails>(
    (set) => ({
      favoriteShops: [],
      isLoading: false,
      addFavoriteShop: (shop: Shop) => {
        set((state) => ({
          ...state,
          isLoading: true,
        }));
        set((state) => {
          const exists = state.favoriteShops.some((s) => s.id === shop.id);
          if (exists) return state;
          return { favoriteShops: [...state.favoriteShops, shop] };
        });
        set((state) => ({
          ...state,
          isLoading: false,
        }));
      },
      removeFavoriteShop: (shop: Shop) => {
        set((state) => ({
          ...state,
          isLoading: true,
          favoriteShops: state.favoriteShops.filter((s) => s.id !== shop.id),
        }));
        set((state) => ({
          ...state,
          isLoading: false,
        }));
      },
      clearFavoriteShops: () => {
        set((state) => ({
          ...state,
          isLoading: true,
          favoriteShops: [],
        }));
        set((state) => ({
          ...state,
          isLoading: false,
        }));
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
