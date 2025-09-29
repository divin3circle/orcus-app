import { authAxios } from '@/services/authService';
import { useAuthStore } from '@/utils/authStore';
import { useQuery } from '@tanstack/react-query';

export interface TokenPurchase {
  id: string;
  user_id: string;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface GetTokenPurchasesResponse {
  purchases: TokenPurchase[];
}

export const useTokenPurchases = () => {
  const { id: userID } = useAuthStore();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['tokenPurchases'],
    queryFn: () => getTokenPurchases(userID),
    enabled: !!userID,
  });
  return { data, isLoading, error, refetch };
};

async function getTokenPurchases(userID: string): Promise<TokenPurchase[]> {
  const response = await authAxios.get(`/purchases/${userID}`);
  const data = response.data as GetTokenPurchasesResponse;
  return data.purchases;
}
