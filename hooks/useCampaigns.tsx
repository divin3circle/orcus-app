import { authAxios } from '@/services/authService';
import { useAuthStore } from '@/utils/authStore';
import { ImageSourcePropType } from 'react-native';
import { useMutation, useQuery } from '@tanstack/react-query';

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

interface JoinCampaignRequest {
  campaign_id: string;
  user_id: string;
  token_balance: number;
}
interface UpdateCampaignRequest {
  campaign_id: string;
  user_id: string;
  username: string;
  token_balance: number;
}

interface CampaignResponse {
  message: string;
  transaction_id: string;
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

export const useGetShopCampaigns = (shopID: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['shop-campaigns', shopID],
    queryFn: () => getShopCampaigns(shopID),
    enabled: !!shopID,
  });
  return { data, isLoading, error, refetch };
};

export const useGetUserShopCampaigns = (shopID: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user-shop-campaigns', shopID],
    queryFn: () => getUserShopCampaigns(shopID),
    enabled: !!shopID,
  });
  return { data, isLoading, error, refetch };
};

async function getShopCampaigns(shopID: string): Promise<Campaign[]> {
  const response = await authAxios.get(`/shops/campaigns/${shopID}`);
  const data = response.data as GetCampaignsResponse;
  return data.campaigns;
}

async function getUserShopCampaigns(shopID: string): Promise<Campaign[]> {
  const response = await authAxios.get(`/user/shops/campaigns/${shopID}`);
  const data = response.data as GetCampaignsResponse;
  return data.campaigns;
}

export const useIsUserInCampaign = (campaignId: string) => {
  const { data: myCampaigns } = useCampaigns();

  const isInCampaign = myCampaigns?.some((entry) => entry.campaign_id === campaignId) || false;
  const campaignEntry = myCampaigns?.find((entry) => entry.campaign_id === campaignId);

  return {
    isInCampaign,
    campaignEntry,
    tokenBalance: campaignEntry?.token_balance || 0,
  };
};

export const useJoinCampaign = () => {
  const { id: userID, username } = useAuthStore();
  const { refetch: refetchMyCampaigns } = useCampaigns();

  const joinCampaignMutation = useMutation({
    mutationFn: joinCampaign,
    onSuccess: () => {
      refetchMyCampaigns();
    },
  });

  const updateCampaignMutation = useMutation({
    mutationFn: updateCampaignPosition,
    onSuccess: () => {
      refetchMyCampaigns();
    },
  });

  const joinOrUpdateCampaign = async (campaignId: string, tokenBalance: number) => {
    if (!userID || !username) {
      throw new Error('User not authenticated');
    }

    // Try to join first
    const joinRequestData = {
      campaign_id: campaignId,
      user_id: userID,
      token_balance: tokenBalance,
    };

    console.log('Attempting to join campaign:', joinRequestData);

    try {
      return await joinCampaignMutation.mutateAsync(joinRequestData);
    } catch (error: any) {
      // If user is already in campaign (400 error), try to update instead
      if (
        error.response?.status === 400 &&
        error.response?.data?.error === 'user is already participating in this campaign'
      ) {
        const updateRequestData = {
          campaign_id: campaignId,
          user_id: userID,
          username,
          token_balance: tokenBalance,
        };

        console.log('User already in campaign, updating instead:', updateRequestData);

        try {
          return await updateCampaignMutation.mutateAsync(updateRequestData);
        } catch (updateError: any) {
          throw updateError;
        }
      }
      // If it's any other error, throw it
      throw error;
    }
  };

  return {
    joinOrUpdateCampaign,
    isLoading: joinCampaignMutation.isPending || updateCampaignMutation.isPending,
    error: joinCampaignMutation.error || updateCampaignMutation.error,
    isSuccess: joinCampaignMutation.isSuccess || updateCampaignMutation.isSuccess,
  };
};

async function joinCampaign(joinCampaignRequest: JoinCampaignRequest): Promise<CampaignResponse> {
  const response = await authAxios.post('/campaigns', joinCampaignRequest);
  return response.data;
}

async function updateCampaignPosition(
  updateCampaignRequest: UpdateCampaignRequest
): Promise<CampaignResponse> {
  const response = await authAxios.post('/campaigns/update', updateCampaignRequest);
  return response.data;
}

export const useCampaignManager = (campaignId: string) => {
  const { isInCampaign, campaignEntry, tokenBalance } = useIsUserInCampaign(campaignId);
  const { joinOrUpdateCampaign, isLoading, error, isSuccess } = useJoinCampaign();

  const handleCampaignAction = async (newTokenBalance: number) => {
    try {
      const result = await joinOrUpdateCampaign(campaignId, newTokenBalance);
      return result;
    } catch (error) {
      throw error;
    }
  };

  return {
    isInCampaign,
    currentTokenBalance: tokenBalance,
    campaignEntry,

    joinOrUpdateCampaign: handleCampaignAction,

    isLoading,
    error,
    isSuccess,
  };
};

export const useShopCampaignManager = (shopId: string) => {
  const {
    data: shopCampaigns,
    isLoading: campaignsLoading,
    refetch: refetchCampaigns,
  } = useGetUserShopCampaigns(shopId);
  const { data: myCampaigns } = useCampaigns();
  const { joinOrUpdateCampaign, isLoading: actionLoading, error, isSuccess } = useJoinCampaign();

  const myCampaignsMap = new Map(myCampaigns?.map((entry) => [entry.campaign_id, entry]) || []);

  const enhancedCampaigns =
    shopCampaigns?.map((campaign) => {
      const userEntry = myCampaignsMap.get(campaign.id);
      return {
        ...campaign,
        isUserParticipating: !!userEntry,
        userTokenBalance: userEntry?.token_balance || 0,
        userEntry,
      };
    }) || [];

  const handleCampaignAction = async (campaignId: string, tokenBalance: number) => {
    try {
      const result = await joinOrUpdateCampaign(campaignId, tokenBalance);
      await refetchCampaigns();
      return result;
    } catch (error) {
      throw error;
    }
  };

  return {
    campaigns: enhancedCampaigns,
    campaignsLoading,

    joinOrUpdateCampaign: handleCampaignAction,

    isLoading: actionLoading,
    error,
    isSuccess,

    refetchCampaigns,
  };
};
