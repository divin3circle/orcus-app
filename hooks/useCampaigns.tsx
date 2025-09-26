import { ImageSourcePropType } from 'react-native';

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

export const useCampaigns = () => {
  return {
    campaigns: [],
    loading: false,
    error: null,
  };
};
