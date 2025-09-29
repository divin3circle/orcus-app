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
import { useTransactions } from '@/hooks/useTransactions';
import { useTokenPurchases } from '@/hooks/useTokenPurchases';
import { useMemo } from 'react';
import { formatBalance } from '@/hooks/useBalances';

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
  const { data: transactions = [], isLoading: transactionsLoading } = useTransactions();
  const { data: purchases = [], isLoading: purchasesLoading } = useTokenPurchases();

  const totalExpenses = useMemo(() => {
    const transactionTotal = transactions.reduce((sum, t) => sum + t.amount + t.fee, 0);
    const purchaseTotal = purchases.reduce((sum, p) => sum + p.amount, 0);
    return transactionTotal + purchaseTotal;
  }, [transactions, purchases]);

  const last30DaysExpenses = useMemo(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentTransactions = transactions.filter((t) => new Date(t.created_at) >= thirtyDaysAgo);
    const recentPurchases = purchases.filter((p) => new Date(p.created_at) >= thirtyDaysAgo);

    const transactionTotal = recentTransactions.reduce((sum, t) => sum + t.amount + t.fee, 0);
    const purchaseTotal = recentPurchases.reduce((sum, p) => sum + p.amount, 0);

    return transactionTotal + purchaseTotal;
  }, [transactions, purchases]);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
        <View className="">
          <View className="mx-4">
            <CustomText text="Total Expenses" className="text-base text-muted-foreground" />
            <CustomText
              text={`KES ${formatBalance(totalExpenses)}`}
              className="text-2xl font-semibold"
            />
            <CustomText
              text={`Amount Spent in the last 30 days`}
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
