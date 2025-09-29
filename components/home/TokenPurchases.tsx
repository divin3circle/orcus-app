import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomText from '../ui/CustomText';
import TransactionCard from '../ui/transaction-card';
import { router } from 'expo-router';
import { useTransactions } from '@/hooks/useTransactions';
import { Skeleton } from '../ui/skeleton';

const TokenPurchases = () => {
  const { data, isLoading, error } = useTransactions();

  if (isLoading) {
    return (
      <View className="mt-4">
        <CustomText text="Recent Transactions" className="text-lg font-semibold" />
        <View className="mt-2 flex items-center gap-2">
          <Skeleton className="h-[70px] w-full rounded-lg bg-foreground/20" />
          <Skeleton className="h-[70px] w-full rounded-lg bg-foreground/20" />
          <Skeleton className="h-[70px] w-full rounded-lg bg-foreground/20" />
        </View>
      </View>
    );
  }
  if (error) {
    return (
      <View className="mt-4">
        <CustomText text={`Error: ${error}`} className="text-lg font-semibold" />
      </View>
    );
  }
  if (!data || data.length === 0) {
    return (
      <View className="mt-4">
        <CustomText text="Recent Transactions" className="text-lg font-semibold" />
        <CustomText text="No transactions found" className="text-sm text-muted-foreground" />
      </View>
    );
  }
  return (
    <View className="mt-12">
      <View className="flex flex-row items-center justify-between">
        <CustomText text="Token Purchases" className="text-lg font-semibold" />
        <Pressable
          className="rounded-3xl border border-foreground/30 px-2 py-1"
          onPress={() => router.push('/transactions')}>
          <CustomText text="View All" className="text-xs" />
        </Pressable>
      </View>
      <View className="">
        {data.slice(0, 3).map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </View>
    </View>
  );
};

export default TokenPurchases;

const styles = StyleSheet.create({});
