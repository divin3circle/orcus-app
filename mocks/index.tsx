import { Shop } from '@/hooks/useShops';
import { Transaction } from '@/hooks/useTransactions';
import { NotificationType } from '@/hooks/useNotifications';
import { Campaign } from '@/hooks/useCampaigns';
import mock1 from '@/assets/images/icon.png';
import mock2 from '@/assets/images/logo.png';
import campaignProfile1 from '@/assets/images/camapaign-profile1.png';
import campaignBanner1 from '@/assets/images/campaibn-banner1.jpg';
import campaignBanner2 from '@/assets/images/campaign-banner2.jpg';
import campaignProfile2 from '@/assets/images/campaign-profile2.png';

export const mockShops: Shop[] = [
  {
    id: 'shop-1',
    merchant_id: 'merchant-001',
    name: 'Coffee Corner',
    theme: 'blue',
    payment_id: 'pay-coffee-001',
    profile_image_url: mock1,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
  },
  {
    id: 'shop-2',
    merchant_id: 'merchant-002',
    name: 'Tech Store',
    theme: 'red',
    payment_id: 'pay-tech-002',
    profile_image_url: mock2,
    created_at: '2024-01-20T14:45:00Z',
    updated_at: '2024-01-20T14:45:00Z',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: 'txn-1',
    shop_id: 'shop-1',
    user_id: 'user-001',
    merchant_id: 'merchant-001',
    amount: 4.5,
    fee: 0.15,
    status: 'completed',
    created_at: '2024-01-15T08:30:00Z',
    updated_at: '2024-01-15T08:30:00Z',
  },
  {
    id: 'txn-2',
    shop_id: 'shop-1',
    user_id: 'user-001',
    merchant_id: 'merchant-001',
    amount: 6.75,
    fee: 0.2,
    status: 'pending',
    created_at: '2024-01-16T14:20:00Z',
    updated_at: '2024-01-16T14:20:00Z',
  },
  {
    id: 'txn-3',
    shop_id: 'shop-2',
    user_id: 'user-001',
    merchant_id: 'merchant-002',
    amount: 299.99,
    fee: 8.99,
    status: 'completed',
    created_at: '2024-01-20T16:45:00Z',
    updated_at: '2024-01-20T16:45:00Z',
  },
  {
    id: 'txn-4',
    shop_id: 'shop-2',
    user_id: 'user-001',
    merchant_id: 'merchant-002',
    amount: 89.5,
    fee: 2.68,
    status: 'failed',
    created_at: '2024-01-21T11:15:00Z',
    updated_at: '2024-01-21T11:15:00Z',
  },
];

export const mockNotifications: NotificationType[] = [
  {
    title: 'Payment Successful',
    date: '2024-01-15T08:30:00Z',
    amount: 4.5,
    type: 'debit',
  },
  {
    title: 'Token Purchase',
    date: '2024-01-21T11:15:00Z',
    amount: 89.5,
    type: 'credit',
  },
  {
    title: 'Payment Pending',
    date: '2024-01-16T14:20:00Z',
    amount: 6.75,
    type: 'debit',
  },
  {
    title: 'Large Purchase Alert',
    date: '2024-01-20T16:45:00Z',
    amount: 299.99,
    type: 'debit',
  },
];

export const mockCampaigns: Campaign[] = [
  {
    id: 'campaign-1',
    shop_id: 'shop-1',
    name: 'Coffee Lovers Rewards',
    token_id: '0.0.55419',
    description: 'Earn tokens with every coffee purchase and unlock exclusive rewards!',
    target_tokens: 10000,
    distributed: 500,
    icon: campaignProfile1,
    banner_image_url: campaignBanner1,
    ended: 0,
  },
  {
    id: 'campaign-2',
    shop_id: 'shop-2',
    name: 'Tech Innovation Drive',
    token_id: '0.0.45896',
    description: 'Support tech innovation and get rewarded with exclusive tech tokens.',
    target_tokens: 25000,
    distributed: 18200,
    icon: campaignProfile2,
    banner_image_url: campaignBanner2,
    ended: 0,
  },
];
