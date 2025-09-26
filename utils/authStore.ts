import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getItem, setItem, deleteItemAsync } from 'expo-secure-store';

export interface User {
  id: string;
  username: string;
  mobileNumber: string;
  accountId: string;
  encryptedKey: string;
  createdAt: string;
  updatedAt: string;
  logIn: () => void;
  logOut: () => void;
  isLoggedIn: boolean;
  isOnboardingComplete: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  paymentID: string;
  setPaymentID: (paymentID: string) => void;
}

export const useAuthStore = create(
  persist<User>(
    (set) => ({
      id: '',
      username: '',
      mobileNumber: '',
      accountId: '',
      encryptedKey: '',
      createdAt: '',
      updatedAt: '',
      isOnboardingComplete: false,
      paymentID: '',
      setPaymentID: (paymentID: string) => {
        set((state) => {
          return {
            ...state,
            paymentID: paymentID,
          };
        });
      },
      completeOnboarding: () => {
        set((state) => {
          return {
            ...state,
            isOnboardingComplete: true,
          };
        });
      },
      resetOnboarding: () => {
        set((state) => {
          return {
            ...state,
            isOnboardingComplete: false,
          };
        });
      },
      logIn: () => {
        set((state) => {
          return {
            ...state,
            isLoggedIn: true,
          };
        });
      },
      logOut: () => {
        set((state) => {
          return {
            ...state,
            isLoggedIn: false,
          };
        });
      },
      isLoggedIn: false,
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ({
        getItem,
        setItem,
        removeItem: deleteItemAsync,
      })),
    }
  )
);
