import { Button } from '@/components/ui/button';
import BalanceContainer from '@/components/home/BalanceContainer';
import HomeHeader from '@/components/home/HomeHeader';
import { Icon } from '@/components/ui/icon';
import { THEME } from '@/lib/theme';
import { Stack } from 'expo-router';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ScrollView, type ImageStyle, SafeAreaView, View, RefreshControl } from 'react-native';
import Favorites from '@/components/home/Favorites';
import RecentTransactions from '@/components/home/RecentTransactions';
import Campaigns from '@/components/home/Campaigns';
import TokenPurchases from '@/components/home/TokenPurchases';
import { useTokenPurchases } from '@/hooks/useTokenPurchases';
import { useCampaigns } from '@/hooks/useCampaigns';
import { useTransactions } from '@/hooks/useTransactions';
import { useBalances } from '@/hooks/useBalances';

const SCREEN_OPTIONS = {
  light: {
    title: 'Home',
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.light.background },
    headerRight: () => <ThemeToggle />,
  },
  dark: {
    title: 'Home',
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.dark.background },
    headerRight: () => <ThemeToggle />,
  },
};

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();
  const [refreshing, setRefreshing] = React.useState(false);

  const { refetch: refetchBalances } = useBalances();
  const { refetch: refetchTransactions } = useTransactions();
  const { refetch: refetchCampaigns } = useCampaigns();
  const { refetch: refetchTokenPurchases } = useTokenPurchases();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    try {
      await Promise.all([
        refetchBalances(),
        refetchTransactions(),
        refetchCampaigns(),
        refetchTokenPurchases(),
      ]);
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  }, [refetchBalances, refetchTransactions, refetchCampaigns, refetchTokenPurchases]);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colorScheme === 'dark' ? '#ffffff' : '#000000'}
            colors={['#000000']}
            title="Pull to refresh"
            titleColor={colorScheme === 'dark' ? '#ffffff' : '#000000'}
          />
        }>
        <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
        <View className="mx-4">
          <HomeHeader />
          <BalanceContainer />
          <Favorites />
          <Campaigns />
          <TokenPurchases />
          <RecentTransactions />
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
