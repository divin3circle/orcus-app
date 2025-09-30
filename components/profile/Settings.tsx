import { StyleSheet, View, Pressable } from 'react-native';
import { Button } from '@/components/ui/button';
import { useColorScheme } from 'nativewind';
import React from 'react';
import CustomText from '../ui/CustomText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Icon } from '../ui/icon';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useAuthStore } from '@/utils/authStore';

const Settings = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { logOut, resetOnboarding } = useAuthStore();
  return (
    <View className="mx-2 mb-14 mt-4 rounded-xl bg-input/30 p-4">
      <View className="flex flex-row items-center justify-between">
        <CustomText text="Settings" className="text-md font-semibold" />
      </View>
      <View className="my-2 flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-3">
          <Ionicons
            name="language-outline"
            size={26}
            color={colorScheme === 'light' ? 'black' : 'white'}
          />
          <View className="">
            <CustomText text="Language" className="text-xs text-muted-foreground" />
            <CustomText text="English" className="text-sm" />
          </View>
        </View>
      </View>
      <View className="my-2 flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-3">
          <Ionicons
            name="notifications-outline"
            size={26}
            color={colorScheme === 'light' ? 'black' : 'white'}
          />
          <View className="">
            <CustomText text="Notifications" className="text-xs text-muted-foreground" />
            <CustomText text="On" className="text-sm" />
          </View>
        </View>
      </View>
      <View className="my-2 flex flex-row items-center justify-between">
        <View className="flex w-full flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-3">
            <Ionicons
              name="color-palette-outline"
              size={26}
              color={colorScheme === 'light' ? 'black' : 'white'}
            />
            <View className="">
              <CustomText text="Theme" className="text-xs text-muted-foreground" />
              <CustomText text={colorScheme === 'light' ? 'Light' : 'Dark'} className="text-sm" />
            </View>
          </View>
          <ThemeToggle />
        </View>
      </View>
      <View className="my-2 flex flex-row items-center justify-between">
        <Pressable
          className="flex flex-row items-center gap-3"
          onPress={() => {
            logOut();
          }}>
          <Ionicons
            name="log-out-outline"
            size={26}
            color={colorScheme === 'light' ? 'black' : 'white'}
          />
          <View className="">
            <CustomText text="Logout" className="text-xs text-muted-foreground" />
            <CustomText text="Exit App" className="text-sm" />
          </View>
        </Pressable>
      </View>
      <View className="my-2 flex flex-row items-center justify-between">
        <Pressable
          className="flex flex-row items-center gap-3"
          onPress={() => {
            resetOnboarding();
          }}>
          <Ionicons
            name="refresh-outline"
            size={26}
            color={colorScheme === 'light' ? 'black' : 'white'}
          />
          <View className="">
            <CustomText text="Relive onboarding experience" className="text-sm" />
            <CustomText text="Reset Onboarding" className="text-xs text-muted-foreground" />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});

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
