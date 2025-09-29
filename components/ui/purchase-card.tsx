import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { TokenPurchase } from '@/hooks/useTokenPurchases';
import CustomText from './CustomText';
import { formatBalance } from '@/hooks/useBalances';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from 'nativewind';

const PurchaseCard = ({ transaction }: { transaction: TokenPurchase }) => {
  const { colorScheme } = useColorScheme();
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
          name="card-outline"
          size={24}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
        <View className="">
          <CustomText text="Token Purchase" />
          <CustomText
            text={formatDate(transaction.created_at)}
            className="text-xs text-muted-foreground"
          />
        </View>
      </View>
      <View className="flex items-end">
        <Text
          className="font-semibold text-green-500"
          style={{
            fontFamily: 'Montserrat',
          }}>
          {`+KES ${transaction.amount.toFixed(2)}`}
        </Text>
        <CustomText text={transaction.status} className="text-xs text-muted-foreground" />
      </View>
    </View>
  );
};

export default PurchaseCard;

const styles = StyleSheet.create({});
