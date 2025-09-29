import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as React from 'react';
import { Pressable, Text, type TextInput, View } from 'react-native';
import TitleText from './ui/title';
import CustomText from './ui/CustomText';
import { Link, useRouter } from 'expo-router';
import { useAuthStore } from '@/utils/authStore';

export function SignUpForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const router = useRouter();
  const { logIn } = useAuthStore();

  function onUsernameSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  function onMobileNumberSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  function onProfileImageUrlSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  function onSubmit() {
    // TODO: Submit form and navigate to protected screen if successful
    console.warn('Submit form and navigate to protected screen if successful');
    logIn();
  }

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
                onSubmitEditing={onUsernameSubmitEditing}
                returnKeyType="next"
                submitBehavior="submit"
                className="border-2 border-border text-sm shadow-none"
                style={{
                  fontFamily: 'Montserrat',
                }}
              />
            </View>
            <View className="gap-1.5">
              <Label htmlFor="mobile_number">
                <CustomText text="Mobile Number" className="" />
              </Label>
              <Input
                id="mobile_number"
                placeholder="mobile number"
                onSubmitEditing={onMobileNumberSubmitEditing}
                returnKeyType="next"
                keyboardType="numeric"
                submitBehavior="submit"
                className="border-2 border-border text-sm shadow-none"
                style={{
                  fontFamily: 'Montserrat',
                }}
              />
            </View>
            <View className="gap-1.5">
              <Label htmlFor="profile_image_url">
                <CustomText text="Profile Image URL" className="" />
              </Label>
              <Input
                id="profile_image_url"
                placeholder="profile image url"
                onSubmitEditing={onProfileImageUrlSubmitEditing}
                returnKeyType="next"
                keyboardType="default"
                submitBehavior="submit"
                className="border-2 border-border text-sm shadow-none"
                style={{
                  fontFamily: 'Montserrat',
                }}
              />
            </View>

            <View className="gap-1.5">
              <Label htmlFor="password">
                <CustomText text="Password" className="" />
              </Label>
              <Input
                ref={passwordInputRef}
                id="password"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={onSubmit}
                className="border-2 border-border text-sm shadow-none"
                style={{
                  fontFamily: 'Montserrat',
                }}
              />
            </View>
            <Button className="w-full" onPress={onSubmit}>
              <Text
                className="text-white"
                style={{
                  fontFamily: 'Montserrat',
                }}>
                Continue
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
