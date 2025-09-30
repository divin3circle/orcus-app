import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as React from 'react';
import { Pressable, Text, type TextInput, View, Alert } from 'react-native';
import TitleText from './ui/title';
import CustomText from './ui/CustomText';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/utils/authStore';
import { LoginData } from '@/services/authService';
import { useColorScheme } from 'nativewind';

export function SignInForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const router = useRouter();
  const { logIn, isAuthLoading } = useAuthStore();
  const { colorScheme } = useColorScheme();

  const [formData, setFormData] = React.useState<LoginData>({
    username: '',
    password: '',
  });

  const [errors, setErrors] = React.useState<Partial<LoginData>>({});

  function onUsernameSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginData> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LoginData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await logIn(formData);
      setFormData({
        username: '',
        password: '',
      });
    } catch (error: any) {
      console.error('Login error details:', error);

      let errorMessage = 'Something went wrong. Please try again.';

      if (error.response?.status === 401) {
        errorMessage = 'Invalid username or password.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Login Failed', errorMessage, [{ text: 'OK' }]);
    }
  };

  return (
    <View className="w-full gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle asChild>
            <Text
              className="text-xl font-semibold"
              style={{
                fontFamily: 'Montserrat',
              }}>
              Sign in to Orcus
            </Text>
          </CardTitle>
          <CardDescription asChild>
            <CustomText text="Welcome back! Please sign in to continue" className="text-sm" />
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="username">
                <CustomText text="Username" className="" />
              </Label>
              <Input
                id="username"
                placeholder="username"
                keyboardType="default"
                autoComplete="email"
                autoCapitalize="none"
                value={formData.username}
                onChangeText={(value) => handleInputChange('username', value)}
                onSubmitEditing={onUsernameSubmitEditing}
                returnKeyType="next"
                submitBehavior="submit"
                className={`border-2 text-sm shadow-none ${errors.username ? 'border-red-500' : 'border-border'}`}
                style={{
                  fontFamily: 'Montserrat',
                }}
              />
              {errors.username && (
                <CustomText text={errors.username} className="text-xs text-red-500" />
              )}
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">
                  <CustomText text="Password" className="" />
                </Label>
                <Button
                  variant="link"
                  size="sm"
                  className="ml-auto h-4 px-1 py-0 web:h-fit sm:h-4"
                  onPress={() => {
                    Alert.alert(
                      'Forgot your password?',
                      'Please contact support to reset your password'
                    );
                  }}>
                  <CustomText text="Forgot your password?" className="font-normal leading-4" />
                </Button>
              </View>
              <Input
                ref={passwordInputRef}
                id="password"
                secureTextEntry
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                returnKeyType="send"
                onSubmitEditing={onSubmit}
                className={`border-2 text-sm shadow-none ${errors.password ? 'border-red-500' : 'border-border'}`}
                style={{
                  fontFamily: 'Montserrat',
                }}
              />
              {errors.password && (
                <CustomText text={errors.password} className="text-xs text-red-500" />
              )}
            </View>
            <Button className="w-full" onPress={onSubmit} disabled={isAuthLoading}>
              <Text
                className=""
                style={{
                  fontFamily: 'Montserrat',
                }}>
                {isAuthLoading ? 'Signing In...' : 'Continue'}
              </Text>
            </Button>
          </View>
          <View className="flex-row items-center justify-center">
            <CustomText text="Don't have an account? " className="text-center text-sm" />
            <Pressable
              onPress={() => {
                router.dismissTo('/create-account');
              }}>
              <CustomText text="Sign up" className="text-sm underline underline-offset-4" />
            </Pressable>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
