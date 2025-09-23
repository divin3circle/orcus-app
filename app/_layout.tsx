import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { isLoggedIn } from '@/hooks/useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';

const queryClient = new QueryClient({});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  useReactQueryDevTools(queryClient);

  const [loaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-VariableFont_wght.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack>
          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack.Protected>
          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="create-account" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
