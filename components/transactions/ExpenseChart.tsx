import { StyleSheet, View } from 'react-native';
import React from 'react';
import { BarChart } from 'react-native-gifted-charts';
import CustomText from '../ui/CustomText';
import { THEME } from '@/lib/theme';
import RecentTransactions from '../home/RecentTransactions';
import TokenPurchases from '../home/TokenPurchases';

const data = [
  { value: 50, label: 'Mon' },
  { value: 20, label: 'Tue' },
  { value: 90, label: 'Wed' },
  { value: 50, label: 'Thu' },
  { value: 30, label: 'Fri' },
  { value: 90, label: 'Sat' },
  { value: 40, label: 'Sun' },
];

const ExpenseChart = () => {
  return (
    <View className="mt-4">
      <CustomText text="Expense Chart" className="mx-4 text-lg font-semibold" />
      <View className="mt-4">
        <BarChart
          data={data}
          frontColor="#FF00FF"
          height={300}
          noOfSections={4}
          barBorderRadius={10}
          yAxisThickness={0}
          xAxisThickness={0}
          xAxisLabelTextStyle={{
            fontFamily: 'Montserrat',
            fontSize: 12,
            fontWeight: 'bold',
            color: THEME.light.mutedForeground,
          }}
          yAxisTextStyle={{
            fontFamily: 'Montserrat',
            fontSize: 12,
            fontWeight: 'bold',
            color: THEME.light.mutedForeground,
          }}
          dashGap={10}
          showValuesAsTopLabel
          topLabelTextStyle={{
            fontFamily: 'Montserrat',
            fontSize: 10,
            fontWeight: 'bold',
            color: THEME.light.mutedForeground,
          }}
        />
      </View>
      <View className="mx-4">
        <TokenPurchases limit={10} />
        <RecentTransactions limit={10} />
      </View>
    </View>
  );
};

export default ExpenseChart;

const styles = StyleSheet.create({});
