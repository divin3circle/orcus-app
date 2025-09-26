import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { THEME } from '@/lib/theme';
import { useColorScheme } from 'nativewind';
import CustomText from '../ui/CustomText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

type ExpoIoniconsName = keyof typeof Ionicons.glyphMap;

interface BalanceActions {
  title: string;
  icon: ExpoIoniconsName;
  action: () => void;
}

const balanceActions = [
  {
    title: 'Pay',
    icon: 'arrow-up-outline',
    action: () => {
      router.push('/(modals)/pay');
    },
  },
  {
    title: 'Send',
    icon: 'send-outline',
    action: () => {
      router.push('/(modals)/send');
    },
  },

  {
    title: 'Buy',
    icon: 'arrow-down-outline',
    action: () => {
      router.push('/(modals)/buy');
    },
  },
];

const BalanceContainer = () => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-input/30 p-4">
      <View className="mt-21 mt-2 flex w-full flex-col items-center justify-end">
        <CustomText text="Total Balance" className="mb-1 text-muted-foreground" />
        <View className="flex flex-row items-center justify-center gap-2">
          <CustomText text="$0.00" className="text-4xl font-semibold" />
          <Pressable>
            <Ionicons
              name="eye-outline"
              size={12}
              color={colorScheme === 'light' ? 'black' : 'white'}
            />
          </Pressable>
        </View>
      </View>
      <View className="mt-4 flex w-full flex-row items-center justify-between gap-2">
        {balanceActions.map((action) => (
          <Pressable
            key={action.title}
            onPress={action.action}
            className="flex w-[30%] items-center justify-center gap-1 rounded-xl border border-foreground/30 p-4">
            <Ionicons
              name={action.icon as ExpoIoniconsName}
              size={24}
              color={colorScheme === 'light' ? 'black' : 'white'}
            />
            <CustomText text={action.title} className="text-sm" />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default BalanceContainer;

const styles = StyleSheet.create({});
