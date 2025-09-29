import { getBaseUrl } from '@/utils';
import axios from 'axios';
import { getItem } from 'expo-secure-store';
import { router } from 'expo-router';
import { useAuthStore } from '@/utils/authStore';

const API_BASE_URL = getBaseUrl();

interface LoginResponse {
  token: {
    token: string;
    expiry: string;
  };
  user_id: string;
}

interface RegisterResponse {
  user: {
    id: string;
    username: string;
    mobile_number: string;
    account_id: string;
    profile_image_url: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  };
}

export interface RegisterData {
  username: string;
  mobile_number: string;
  password: string;
  profile_image_url: string;
}

export interface LoginData {
  username: string;
  password: string;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const isTokenValid = (expiry: string): boolean => {
  if (!expiry) return false;
  try {
    const expiryDate = new Date(expiry);
    const now = new Date();
    return expiryDate.getTime() > now.getTime() + 5 * 60 * 1000;
  } catch {
    return false;
  }
};

export const authAxios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

authAxios.interceptors.request.use(
  async (config) => {
    try {
      const authData = await getItem('auth-storage');
      if (authData) {
        const parsedData = JSON.parse(authData);
        const { authToken, tokenExpiry } = parsedData.state;

        if (authToken && isTokenValid(tokenExpiry)) {
          config.headers.Authorization = `Bearer ${authToken}`;
        } else {
          useAuthStore.getState().logOut();
          router.replace('/sign-in');
          throw new Error('Invalid or expired token');
        }
      } else {
        router.replace('/sign-in');
        throw new Error('No authentication data found');
      }
    } catch (error) {
      console.error('Auth interceptor error:', error);
      throw error;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logOut();
      router.replace('/sign-in');
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async login(userData: LoginData): Promise<LoginResponse> {
    const response = await apiClient.post('/login-user', userData);
    return response.data;
  },

  async register(userData: RegisterData): Promise<RegisterResponse> {
    const response = await apiClient.post('/register-user', userData);
    return response.data;
  },
};
