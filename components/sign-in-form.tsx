import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as React from 'react';
import { Pressable, type TextInput, View } from 'react-native';
import TitleText from './ui/title';
import CustomText from './ui/CustomText';
import { Link, useRouter } from 'expo-router';

export function SignInForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const router = useRouter();

  function onUsernameSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  function onSubmit() {
    // TODO: Submit form and navigate to protected screen if successful
  }

  return (
    <View className="w-full gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle asChild>
            <TitleText title="Sign in to Orcus" />
          </CardTitle>
          <CardDescription asChild>
            <CustomText text="Welcome back! Please sign in to continue" className="" />
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
              <View className="flex-row items-center">
                <Label htmlFor="password">
                  <CustomText text="Password" className="" />
                </Label>
                <Button
                  variant="link"
                  size="sm"
                  className="ml-auto h-4 px-1 py-0 web:h-fit sm:h-4"
                  onPress={() => {
                    // TODO: Navigate to forgot password screen
                  }}>
                  <CustomText text="Forgot your password?" className="font-normal leading-4" />
                </Button>
              </View>
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
              <CustomText text="Continue" className="text-white" />
            </Button>
          </View>
          <View className="flex-row items-center justify-center">
            <CustomText text="Don't have an account? " className="text-center text-sm" />
            <Pressable
              onPress={() => {
                router.push('/create-account');
              }}>
              <CustomText text="Sign up" className="text-sm underline underline-offset-4" />
            </Pressable>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
