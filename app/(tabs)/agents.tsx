import { Button } from '@/components/ui/button';
import CustomKeyboards from '@/components/ui/custom-keyboard';
import CustomText from '@/components/ui/CustomText';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useKESTBalance } from '@/hooks/useBalances';
import { THEME } from '@/lib/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Stack } from 'expo-router';
import { ChevronsDown, MoonStarIcon, StarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, type ImageStyle, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_OPTIONS = {
  light: {
    title: 'Swap',
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.light.background },
    headerRight: () => <ThemeToggle />,
  },
  dark: {
    title: 'Swap',
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.dark.background },
    headerRight: () => <ThemeToggle />,
  },
};

export default function OfflineScreen() {
  const { colorScheme } = useColorScheme();
  const { data: kshBalance, isLoading, error } = useKESTBalance();
  const EXCHANGE_RATE_KES_PER_USDC = 134;
  const [usdcAmount, setUsdcAmount] = React.useState<string>('');
  const [kesAmount, setKesAmount] = React.useState<string>('');
  const [activeField, setActiveField] = React.useState<'USDC' | 'KES'>('USDC');
  const [isSwapping, setIsSwapping] = React.useState(false);
  function sanitizeNumeric(text: string) {
    return text.replace(/[^0-9.]/g, '');
  }

  function handleUsdcChange(text: string) {
    const cleaned = sanitizeNumeric(text);
    setUsdcAmount(cleaned);
    const value = Number(cleaned);
    if (!cleaned || Number.isNaN(value)) {
      setKesAmount('');
      return;
    }
    const kes = (value * EXCHANGE_RATE_KES_PER_USDC).toFixed(2);
    setKesAmount(kes);
  }

  function handleKesChange(text: string) {
    const cleaned = sanitizeNumeric(text);
    setKesAmount(cleaned);
    const value = Number(cleaned);
    if (!cleaned || Number.isNaN(value)) {
      setUsdcAmount('');
      return;
    }
    const usdc = (value / EXCHANGE_RATE_KES_PER_USDC).toFixed(6);
    setUsdcAmount(usdc);
  }

  function applyToActiveField(nextValue: string) {
    if (activeField === 'USDC') {
      handleUsdcChange(nextValue);
    } else {
      handleKesChange(nextValue);
    }
  }

  function handleCustomKeyPress(key: string) {
    if (key === 'Ksh') {
      setActiveField('KES');
      return;
    }
    const current = activeField === 'USDC' ? usdcAmount : kesAmount;
    if (key === '.') {
      if ((current || '').includes('.')) return;
      applyToActiveField((current || '') + '.');
      return;
    }
    // digits 0-9
    if (/^\d$/.test(key)) {
      const next = (current || '') + key;
      applyToActiveField(next);
    }
  }

  function handleCustomBackspace() {
    const current = activeField === 'USDC' ? usdcAmount : kesAmount;
    if (!current) return;
    const next = current.slice(0, -1);
    applyToActiveField(next);
  }

  function handleCustomClear() {
    applyToActiveField('');
  }

  function swap() {
    console.log(kesAmount);
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
    }, 1000);
  }

  return (
    <SafeAreaView className="flex-1 px-2">
      <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
      <View className="items-center justify-center">
        <CustomText text="Swap USDC for KES" className="text-base font-bold" />
      </View>
      <View className="relative">
        <View className="group mt-2 flex h-[150px] w-full cursor-pointer flex-col justify-between rounded-3xl border border-foreground/30 bg-transparent p-4">
          <Text
            className="font-funnel-display text-sm font-light text-muted-foreground"
            style={{
              fontFamily: 'FunnelDisplay-Light',
            }}>
            You Sell
          </Text>
          <View className="flex flex-row items-center justify-between">
            <TextInput
              className="h-full w-[60%] bg-transparent text-3xl font-semibold placeholder:text-muted-foreground focus:outline-none"
              placeholder="0.00"
              keyboardType="numeric"
              value={usdcAmount}
              onChangeText={handleUsdcChange}
              onFocus={() => setActiveField('USDC')}
              placeholderTextColor={THEME.light.mutedForeground}
              style={{
                fontFamily: 'FunnelDisplay-Regular',
              }}
            />
            <View className="flex flex-row items-center gap-1 rounded-3xl border border-foreground/30 p-1">
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbBMfDxr1PrxlKVnOBktTGlNgXSVYUT0LB7Q&s',
                }}
                className="h-6 w-6 rounded-full"
              />
              <Text
                className="text-sm font-semibold text-foreground"
                style={{
                  fontFamily: 'FunnelDisplay-Regular',
                }}>
                USDC
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center gap-1">
            <Ionicons name="wallet-outline" size={20} color="orange" />
            <Text
              className="text-sm font-semibold text-foreground"
              style={{
                fontFamily: 'FunnelDisplay-Regular',
              }}>
              0.00 USDC
            </Text>
          </View>
        </View>
        <View className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
          <View className="flex items-center justify-center rounded-lg bg-background p-[3px]">
            <View className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg bg-foreground/5 transition-colors duration-200">
              <ChevronsDown className="h-6 w-6 text-foreground" />
            </View>
          </View>
        </View>
        <View className="group mt-1 flex h-[150px] w-full cursor-pointer flex-col justify-between rounded-3xl bg-foreground/5 p-4 transition-all duration-300 ease-in hover:bg-foreground/10">
          <Text
            className="font-funnel-display text-sm font-light text-muted-foreground"
            style={{
              fontFamily: 'FunnelDisplay-Light',
            }}>
            You Buy
          </Text>
          <View className="flex flex-row items-center justify-between">
            <TextInput
              className="h-full w-[60%] bg-transparent text-3xl font-semibold placeholder:text-muted-foreground focus:outline-none"
              placeholder="0.00"
              keyboardType="numeric"
              value={kesAmount}
              onChangeText={handleKesChange}
              onFocus={() => setActiveField('KES')}
              placeholderTextColor={THEME.light.mutedForeground}
              style={{
                fontFamily: 'FunnelDisplay-Regular',
              }}
            />
            <View className="flex flex-row items-center gap-1 rounded-3xl border border-foreground/30 p-1 px-2">
              <Image source={require('@/assets/images/ksh.png')} className="h-6 w-6 rounded-full" />
              <Text
                className="text-sm font-semibold text-foreground"
                style={{
                  fontFamily: 'FunnelDisplay-Regular',
                }}>
                KES
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center gap-1">
            <Ionicons name="wallet-outline" size={20} color="orange" />
            <Text
              className="text-sm font-semibold text-foreground"
              style={{
                fontFamily: 'FunnelDisplay-Regular',
              }}>
              {kshBalance ? `${(kshBalance / 100).toFixed(2)} KES` : '0.00 KES'}
            </Text>
          </View>
        </View>
      </View>
      <CustomKeyboards
        onKeyPress={handleCustomKeyPress}
        onBackspace={handleCustomBackspace}
        onClear={handleCustomClear}
        onConfirm={swap}
        isLoading={isSwapping}
      />
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
