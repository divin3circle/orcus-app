import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { Pressable, type TextInput, View } from 'react-native';
import TitleText from './ui/title';
import CustomText from './ui/CustomText';
import { Link, useRouter } from 'expo-router';

export function SignUpForm() {
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
              <CustomText text="Continue" className="text-white" />
            </Button>
          </View>
          <View className="flex-row items-center justify-center">
            <CustomText text="Already have an account? " className="text-center text-sm" />
            <Pressable
              onPress={() => {
                router.push('/sign-in');
              }}>
              <CustomText text="Sign in" className="text-sm underline underline-offset-4" />
            </Pressable>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
