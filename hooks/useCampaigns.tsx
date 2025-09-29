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
  target: number;
  distributed: number;
  icon: ImageSourcePropType;
  banner_image_url: string;
  ended: number;
}

export interface CampaignEntry {
  id: string;
  shop_id: string;
  campaign_id: string;
  token_balance: number;
}

interface GetCampaignEntries {
  campaigns: CampaignEntry[];
}

interface GetCampaignsResponse {
  campaigns: Campaign[];
}

interface GetCampaignResponse {
  campaign: Campaign;
}

export const useCampaigns = () => {
  const { id: userID } = useAuthStore();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => getMyCampaigns(userID),
    enabled: !!userID,
  });
  return { data, isLoading, error, refetch };
};

async function getMyCampaigns(userID: string | undefined): Promise<CampaignEntry[] | undefined> {
  if (!userID) {
    console.error('User ID is required');
    throw new Error('User ID is required');
  }

  const response = await authAxios.get(`/user/campaigns/${userID}`);
  const data = response.data as GetCampaignEntries;
  if (!data.campaigns) {
    return [];
  }
  return data.campaigns;
}

export const useCampaign = (campaignID: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['campaign', campaignID],
    queryFn: () => getCampaign(campaignID),
    enabled: !!campaignID,
  });
  return { data, isLoading, error, refetch };
};

async function getCampaign(campaignID: string): Promise<Campaign | undefined> {
  const response = await authAxios.get(`/campaigns/${campaignID}`);
  const data = response.data as GetCampaignResponse;
  return data.campaign;
}
