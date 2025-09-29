import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Transaction } from '@/hooks/useTransactions';
import { useGetShopByID } from '@/hooks/useShops';
import CustomText from './CustomText';
import { Skeleton } from './skeleton';
import { formatBalance } from '@/hooks/useBalances';
import Ionicons from '@expo/vector-icons/Ionicons';

const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  const { data: shop, isLoading, error } = useGetShopByID(transaction.shop_id);
  if (isLoading) return <Skeleton className="mt-2 h-[70px] w-full rounded-lg bg-foreground/20" />;
  if (error) return <CustomText text={`Error: ${error}`} className="mt-2" />;
  if (!shop) return null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <View className="flex flex-row items-center justify-between rounded-xl bg-card p-4">
      <View className="flex flex-row items-center gap-2">
        <Ionicons
          name="storefront-outline"
          size={24}
          color={shop.theme === 'red' ? 'red' : 'blue'}
        />
        <View className="">
          <CustomText text={shop.name} />
          <CustomText
            text={formatDate(transaction.created_at)}
            className="text-sm text-muted-foreground"
          />
        </View>
      </View>
      <View className="flex items-end">
        <CustomText
          text={`-KES ${formatBalance(transaction.amount)}`}
          className="font-semibold text-red-500"
        />
        <CustomText
          text={`KES ${formatBalance(transaction.fee)}`}
          className="text-xs text-muted-foreground"
        />
      </View>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({});
