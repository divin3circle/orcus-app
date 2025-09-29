import { mockShops } from '@/mocks';
import { ImageSourcePropType } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { authAxios } from '@/services/authService';

export interface Shop {
  id: string;
  merchant_id: string;
  name: string;
  theme: string;
  payment_id: string;
  profile_image_url: ImageSourcePropType;
  created_at: string;
  updated_at: string;
}

interface GetShopByIDResponse {
  shop: Shop;
}

export function useGetShopByID(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['shop', id],
    queryFn: () => getShopByID(id),
  });
  return { data, isLoading, error };
}

async function getShopByID(id: string): Promise<Shop | undefined> {
  const response = await authAxios.get(`user/shops/${id}`);
  const data = response.data as GetShopByIDResponse;
  return data.shop;
}
