import { Button } from '@/components/ui/button';
import BalanceContainer from '@/components/home/BalanceContainer';
import HomeHeader from '@/components/home/HomeHeader';
import { Icon } from '@/components/ui/icon';
import { THEME } from '@/lib/theme';
import { Stack } from 'expo-router';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ScrollView, type ImageStyle, SafeAreaView, View } from 'react-native';
import Favorites from '@/components/home/Favorites';
import RecentTransactions from '@/components/home/RecentTransactions';
import Campaigns from '@/components/home/Campaigns';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

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

const IMAGE_STYLE: ImageStyle = {
  height: 76,
  width: 76,
};

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
        <View className="mx-4">
          <HomeHeader />
          <BalanceContainer />
          <Favorites />
          <Campaigns />
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
