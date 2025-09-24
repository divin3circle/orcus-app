import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
  RadarChart,
} from 'react-native-gifted-charts';
import CustomText from '../ui/CustomText';

const ExpenseChart = () => {
  return (
    <View className="mt-4">
      <CustomText text="Expense Chart" className="text-lg font-semibold" />
    </View>
  );
};

export default ExpenseChart;

const styles = StyleSheet.create({});
