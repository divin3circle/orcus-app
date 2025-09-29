import { useState } from 'react';
import { authAxios } from '@/services/authService';

interface PaymentRequest {
  shop_id: string;
  username: string;
  amount: number;
}

export interface TransactionResponse {
  transaction_id: string;
  transaction: {
    id: string;
    shop_id: string;
    user_id: string;
    merchant_id: string;
    amount: number;
    fee: number;
    status: string;
    created_at: string;
    updated_at: string;
  };
  fees: {
    hash: string;
    nodeID: string;
    transactionID: string;
  };
  hedera_transaction: {
    hash: string;
    nodeID: string;
    transactionID: string;
  };
}

interface PaymentResponse {
  data: TransactionResponse;
}

export const usePay = () => {
  const [isLoading, setIsLoading] = useState(false);

  const pay = async (paymentData: PaymentRequest): Promise<PaymentResponse> => {
    setIsLoading(true);

    try {
      const response = await authAxios.post<PaymentResponse>('transactions', paymentData);
      return response.data;
    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pay,
    isLoading,
  };
};
