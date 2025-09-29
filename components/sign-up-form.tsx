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
import { RegisterData } from '@/services/authService';
import { AxiosError } from 'axios';

export function SignUpForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const router = useRouter();
  const { register, isAuthLoading } = useAuthStore();

  const [formData, setFormData] = React.useState<RegisterData>({
    username: '',
    mobile_number: '',
    password: '',
    profile_image_url: '',
  });

  const [errors, setErrors] = React.useState<Partial<RegisterData>>({});

  function onUsernameSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  function onMobileNumberSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  function onProfileImageUrlSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterData> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.mobile_number.trim()) {
      newErrors.mobile_number = 'Mobile number is required';
    } else if (!formData.mobile_number.startsWith('+')) {
      newErrors.mobile_number = 'Mobile number must start with +';
    } else if (formData.mobile_number.length !== 13) {
      newErrors.mobile_number = 'Mobile number must be exactly 13 characters';
    } else if (!/^\+[\d]+$/.test(formData.mobile_number)) {
      newErrors.mobile_number = 'Mobile number can only contain + and digits';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.profile_image_url.trim()) {
      newErrors.profile_image_url = 'Profile image URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof RegisterData, value: string) => {
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
      await register(formData);
      setFormData({
        username: '',
        mobile_number: '',
        password: '',
        profile_image_url: '',
      });
    } catch (error: any) {
      console.error('Registration error details:', error);

      let errorMessage = 'Something went wrong. Please try again.';

      if (error.response?.status === 401) {
        errorMessage = 'Authentication failed. Please check your credentials.';
      } else if (error.response?.status === 409) {
        errorMessage = 'Username already exists. Please choose a different username.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Registration Failed', errorMessage, [{ text: 'OK' }]);
    }
  };

  return (
    <View className="w-full gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle asChild>
            <TitleText title="Create your account" />
          </CardTitle>
          <CardDescription asChild>
            <CustomText text="Welcome! Please fill in the details to get started" className="" />
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
              <Label htmlFor="mobile_number">
                <CustomText text="Mobile Number" className="" />
              </Label>
              <Input
                id="mobile_number"
                placeholder="+254701838695"
                value={formData.mobile_number}
                onChangeText={(value) => handleInputChange('mobile_number', value)}
                onSubmitEditing={onMobileNumberSubmitEditing}
                returnKeyType="next"
                keyboardType="default"
                submitBehavior="submit"
                maxLength={13}
                className={`border-2 text-sm shadow-none ${errors.mobile_number ? 'border-red-500' : 'border-border'}`}
                style={{
                  fontFamily: 'Montserrat',
                }}
              />
              {errors.mobile_number && (
                <CustomText text={errors.mobile_number} className="text-xs text-red-500" />
              )}
            </View>
            <View className="gap-1.5">
              <Label htmlFor="profile_image_url">
                <CustomText text="Profile Image URL" className="" />
              </Label>
              <Input
                id="profile_image_url"
                placeholder="profile image url"
                value={formData.profile_image_url}
                onChangeText={(value) => handleInputChange('profile_image_url', value)}
                onSubmitEditing={onProfileImageUrlSubmitEditing}
                returnKeyType="next"
                keyboardType="default"
                submitBehavior="submit"
                className={`border-2 text-sm shadow-none ${errors.profile_image_url ? 'border-red-500' : 'border-border'}`}
                style={{
                  fontFamily: 'Montserrat',
                }}
              />
              {errors.profile_image_url && (
                <CustomText text={errors.profile_image_url} className="text-xs text-red-500" />
              )}
            </View>

            <View className="gap-1.5">
              <Label htmlFor="password">
                <CustomText text="Password" className="" />
              </Label>
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
                className="text-white"
                style={{
                  fontFamily: 'Montserrat',
                }}>
                {isAuthLoading ? 'Creating Account...' : 'Continue'}
              </Text>
            </Button>
          </View>
          <View className="flex-row items-center justify-center">
            <CustomText text="Already have an account? " className="text-center text-sm" />
            <Pressable
              onPress={() => {
                router.dismissTo('/sign-in');
              }}>
              <CustomText text="Sign in" className="text-sm underline underline-offset-4" />
            </Pressable>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
