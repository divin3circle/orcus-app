import { authAxios } from '@/services/authService';
import { useAuthStore } from '@/utils/authStore';
import { ImageSourcePropType } from 'react-native';
import { useQuery } from '@tanstack/react-query';

export interface Campaign {
  id: string;
  shop_id: string;
  name: string;
  token_id: string;
  description: string;
  target_tokens: number;
  distributed: number;
  icon: ImageSourcePropType;
  banner_image_url: string;
  ended: number;
}

interface GetCampaignsResponse {
  campaigns: Campaign[];
}

export const useCampaigns = () => {
  const { id: userID } = useAuthStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => getMyCampaigns(userID),
    enabled: !!userID,
  });
  return { data, isLoading, error };
};

async function getMyCampaigns(userID: string | undefined): Promise<Campaign[] | undefined> {
  if (!userID) {
    console.error('User ID is required');
    throw new Error('User ID is required');
  }
  const response = await authAxios.get(`/campaigns/${userID}`);
  const data = response.data as GetCampaignsResponse;
  return data.campaigns;
}
