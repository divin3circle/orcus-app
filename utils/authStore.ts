import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getItem, setItem, deleteItemAsync } from 'expo-secure-store';
import { authService, LoginData, RegisterData } from '@/services/authService';
import { router } from 'expo-router';

export interface User {
  id: string;
  username: string;
  mobileNumber: string;
  profileImageUrl: string;
  accountId: string;
  topicId: string;
  encryptedKey: string;
  authToken: string;
  tokenExpiry: string;
  createdAt: string;
  updatedAt: string;
  logIn: (userData: LoginData) => void;
  register: (userData: RegisterData) => void;
  logOut: () => void;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
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
      topicId: '',
      profileImageUrl: '',
      authToken: '',
      encryptedKey: '',
      tokenExpiry: '',
      isAuthLoading: false,
      createdAt: '',
      updatedAt: '',
      isOnboardingComplete: true,
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
      logIn: async (userData: LoginData) => {
        try {
          set((state) => {
            return {
              ...state,
              isAuthLoading: true,
            };
          });

          const loginResponse = await authService.login(userData);
          const userResponse = await authService.getUserById(
            loginResponse.user_id,
            loginResponse.token.token
          );

          set((state) => {
            return {
              ...state,
              authToken: loginResponse.token.token,
              tokenExpiry: loginResponse.token.expiry,
              id: userResponse.user.id,
              username: userResponse.user.username,
              mobileNumber: userResponse.user.mobile_number,
              accountId: userResponse.user.account_id,
              topicId: userResponse.user.topic_id,
              profileImageUrl: userResponse.user.profile_image_url,
              createdAt: userResponse.user.created_at,
              updatedAt: userResponse.user.updated_at,
              isLoggedIn: true,
              isAuthLoading: false,
            };
          });
          router.push('/(tabs)');
        } catch (error) {
          console.error('Login failed:', error);
          set((state) => {
            return {
              ...state,
              isAuthLoading: false,
            };
          });
          throw error;
        }
      },
      logOut: () => {
        set((state) => {
          return {
            ...state,
            isLoggedIn: false,
            authToken: '',
            tokenExpiry: '',
            id: '',
            username: '',
            mobileNumber: '',
            accountId: '',
            topicId: '',
            profileImageUrl: '',
            createdAt: '',
            updatedAt: '',
          };
        });
      },
      register: async (userData: RegisterData) => {
        try {
          set((state) => {
            return {
              ...state,
              isAuthLoading: true,
            };
          });
          const response = await authService.register(userData);
          set((state) => {
            return {
              ...state,
              id: response.user.id,
              username: response.user.username,
              mobileNumber: response.user.mobile_number,
              accountId: response.user.account_id,
              profileImageUrl: response.user.profile_image_url,
              isAuthLoading: false,
              createdAt: response.user.created_at,
              updatedAt: response.user.updated_at,
            };
          });
          router.push('/sign-in');
        } catch (error) {
          console.error('Register failed:', error);
          set((state) => {
            return {
              ...state,
              isAuthLoading: false,
            };
          });
          throw error;
        }
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
