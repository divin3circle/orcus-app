import { Button } from '@/components/ui/button';
import CustomText from '@/components/ui/CustomText';
import { Icon } from '@/components/ui/icon';
import Ionicons from '@expo/vector-icons/Ionicons';
import { THEME } from '@/lib/theme';
import { Stack } from 'expo-router';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, type ImageStyle, SafeAreaView, ScrollView, View } from 'react-native';
import PersonalInformation from '@/components/profile/PersonalInformation';
import Settings from '@/components/profile/Settings';
import { useAuthStore } from '@/utils/authStore';

const SCREEN_OPTIONS = {
  light: {
    title: 'Profile',
    headerTransparent: true,
    headerShadowVisible: true,
    headerStyle: { backgroundColor: THEME.light.background },
    headerRight: () => <ThemeToggle />,
  },
  dark: {
    title: 'Profile',
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

export default function ProfileScreen() {
  const { colorScheme } = useColorScheme();
  const { profileImageUrl } = useAuthStore();
  const [imageError, setImageError] = React.useState(false);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
        <View className="items-center justify-center gap-8 p-4">
          <CustomText text="Profile" className="text-lg font-semibold" />
          <View className="relative h-40 w-40 rounded-full border border-foreground/50">
            {profileImageUrl && !imageError ? (
              <Image
                source={{ uri: profileImageUrl }}
                style={{ width: 160, height: 160, borderRadius: 80 }}
                resizeMode="cover"
                onLoad={() => {
                  console.log('✅ Profile image loaded successfully');
                  setImageError(false);
                }}
                onError={(error) => {
                  console.log(
                    '❌ Profile image load error:',
                    error.nativeEvent?.error || 'Unknown error'
                  );
                  setImageError(true);
                }}
              />
            ) : (
              <Image
                source={require('@/assets/images/profile.jpeg')}
                style={{ width: 160, height: 160, borderRadius: 80 }}
                resizeMode="cover"
              />
            )}
            <View className="absolute bottom-0 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-foreground p-1">
              <Ionicons
                name="camera-outline"
                size={24}
                color={colorScheme !== 'light' ? 'black' : 'white'}
              />
            </View>
          </View>
        </View>
        <PersonalInformation />
        <Settings />
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
