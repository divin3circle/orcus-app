import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomText from '../ui/CustomText';
import { mockTransactions } from '@/mocks';
import TransactionCard from '../ui/transaction-card';

const RecentTransactions = () => {
  return (
    <View className="mt-4 pb-16">
      <View className="flex flex-row items-center justify-between">
        <CustomText text="Recent Transactions" className="text-lg font-semibold" />
        <Pressable className="rounded-3xl border border-foreground/30 px-2 py-1">
          <CustomText text="View All" className="text-xs" />
        </Pressable>
      </View>
      <View className="mt-2">
        {mockTransactions.slice(0, 3).map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </View>
    </View>
  );
};

export default RecentTransactions;

const styles = StyleSheet.create({});
