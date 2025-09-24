import { Button } from '@/components/ui/button';
import CustomText from '@/components/ui/CustomText';
import { Icon } from '@/components/ui/icon';
import { THEME } from '@/lib/theme';
import { Stack } from 'expo-router';
import { MoonStarIcon, StarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { type ImageStyle, ScrollView, View, SafeAreaView } from 'react-native';
import ExpenseChart from '@/components/transactions/ExpenseChart';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const SCREEN_OPTIONS = {
  light: {
    title: 'Transactions',
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.light.background },
    headerRight: () => <ThemeToggle />,
  },
  dark: {
    title: 'Transactions',
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.dark.background },
    headerRight: () => <ThemeToggle />,
  },
};

const IMAGE_STYLE: ImageStyle = {
  height: 76,
  width: 76,
};

export default function TransactionsScreen() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
        <View className="mx-4">
          <View className="">
            <CustomText text="Total Expenses" className="text-base text-muted-foreground" />
            <CustomText text="KES 736.87" className="text-2xl font-semibold" />
            <CustomText
              text="Amount Spent in the last 30 days"
              className="text-xs text-muted-foreground"
            />
          </View>
          <ExpenseChart />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="rounded-full web:mx-4">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
