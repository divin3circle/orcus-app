import { StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { BarChart } from 'react-native-gifted-charts';
import CustomText from '../ui/CustomText';
import { THEME } from '@/lib/theme';
import RecentTransactions from '../home/RecentTransactions';
import TokenPurchases from '../home/TokenPurchases';
import { useTransactions } from '@/hooks/useTransactions';
import { useTokenPurchases } from '@/hooks/useTokenPurchases';
import { useColorScheme } from 'nativewind';

const ExpenseChart = () => {
  const { colorScheme } = useColorScheme();
  const { data: transactions = [], isLoading: transactionsLoading } = useTransactions();

  const chartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });

    const allExpenses = transactions.map((t) => ({
      date: new Date(t.created_at),
      amount: t.amount + t.fee,
      type: 'transaction' as const,
    }));

    const dailyExpenses = last7Days.map((day) => {
      const dayStart = new Date(day);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(day);
      dayEnd.setHours(23, 59, 59, 999);

      const dayExpenses = allExpenses.filter(
        (expense) => expense.date >= dayStart && expense.date <= dayEnd
      );

      const totalAmount = dayExpenses.reduce((sum, expense) => sum + expense.amount, 0);

      return {
        value: totalAmount / 100,
        label: day.toLocaleDateString('en-US', { weekday: 'short' }),
      };
    });

    return dailyExpenses;
  }, [transactions]);

  if (transactionsLoading) {
    return (
      <View className="mt-4">
        <CustomText text="Expense Chart" className="mx-4 text-lg font-semibold" />
        <View className="mt-4 h-[300px] items-center justify-center">
          <CustomText text="Loading chart data..." className="text-muted-foreground" />
        </View>
      </View>
    );
  }

  return (
    <View className="mt-4">
      <CustomText text="Expense Chart" className="mx-4 text-lg font-semibold" />
      <View className="mt-4">
        <BarChart
          data={chartData}
          frontColor={colorScheme === 'dark' ? '#8B5CF6' : '#FF00FF'}
          height={400}
          noOfSections={5}
          barBorderRadius={10}
          yAxisThickness={0}
          xAxisThickness={0}
          xAxisLabelTextStyle={{
            fontFamily: 'Montserrat',
            fontSize: 12,
            fontWeight: 'bold',
            color: THEME[colorScheme ?? 'light'].mutedForeground,
          }}
          yAxisTextStyle={{
            fontFamily: 'Montserrat',
            fontSize: 12,
            fontWeight: 'bold',
            color: THEME[colorScheme ?? 'light'].mutedForeground,
          }}
          dashGap={10}
          topLabelTextStyle={{
            fontFamily: 'Montserrat',
            fontSize: 10,
            fontWeight: 'bold',
            color: THEME[colorScheme ?? 'light'].mutedForeground,
          }}
        />
      </View>
      <View className="mx-4">
        <TokenPurchases limit={30} />
        <RecentTransactions limit={30} />
      </View>
    </View>
  );
};

export default ExpenseChart;

const styles = StyleSheet.create({});
