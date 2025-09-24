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
