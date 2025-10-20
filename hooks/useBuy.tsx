import { useState } from 'react';
import { authAxios } from '@/services/authService';

interface BuyRequest {
  user_id: string;
  amount: number;
  asset?: 'KES' | 'HBAR';
}

export interface BuyResponse {
  message: string;
  transaction_id: string;
}

export const useBuy = () => {
  const [isLoading, setIsLoading] = useState(false);

  const buy = async (buyData: BuyRequest): Promise<BuyResponse> => {
    setIsLoading(true);

    try {
      const response = await authAxios.post<BuyResponse>('purchases', buyData);
      return response.data;
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    buy,
    isLoading,
  };
};
