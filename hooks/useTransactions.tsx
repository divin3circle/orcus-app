import { authAxios } from '@/services/authService';
import { useAuthStore } from '@/utils/authStore';
import { useQuery } from '@tanstack/react-query';

export interface Transaction {
  id: string;
  shop_id: string;
  user_id: string;
  merchant_id: string;
  amount: number;
  fee: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

interface GetTransactionsResponse {
  transactions: Transaction[] | null;
}

export const useTransactions = () => {
  const { id: userID } = useAuthStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactions(userID),
    enabled: !!userID,
  });
  return { data, isLoading, error };
};

async function getTransactions(userID: string | undefined): Promise<Transaction[] | undefined> {
  if (!userID) {
    console.error('User ID is required');
    return [];
  }
  const response = await authAxios.get(`/transactions/user/${userID}`);
  const data = response.data as GetTransactionsResponse;
  return data.transactions || [];
}
