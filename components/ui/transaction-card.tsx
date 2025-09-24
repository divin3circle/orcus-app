import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Transaction } from '@/hooks/useTransactions';
import { useGetShopByID } from '@/hooks/useShops';
import CustomText from './CustomText';

const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  const { data: shop } = useGetShopByID(transaction.shop_id);
  if (!shop) return null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View className="flex flex-row items-center justify-between rounded-xl bg-card p-4">
      <View className="flex flex-row items-center gap-2">
        <Image
          source={shop.profile_image_url}
          className="h-10 w-10 rounded-full border-[1px] border-foreground/30"
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
        <CustomText text={`-KES ${transaction.amount}`} className="font-semibold text-red-500" />
        <CustomText
          text={`KES ${transaction.fee.toString()}`}
          className="text-xs text-muted-foreground"
        />
      </View>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({});
