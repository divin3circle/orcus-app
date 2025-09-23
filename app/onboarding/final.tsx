import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import Lottie from 'lottie-react-native';
import animation from '@/assets/lottie/animation2.json';
import CustomText from '@/components/ui/CustomText';
import { ArrowRight } from 'lucide-react-native';
import { useAuthStore } from '@/utils/authStore';

const FinalOnboarding = () => {
  const { width } = useWindowDimensions();
  const { completeOnboarding } = useAuthStore();
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#d9d9d9]">
      <CustomText text="Let's get you started" className="text-2xl" />
      <Lottie
        source={animation}
        autoPlay
        loop
        style={{ width: width * 0.8, height: width * 0.8 }}
      />
      <CustomText
        text="Create an account a user account and begin paying for goods and services at insalely low fees and insstant speeds"
        className="text- px-4 text-sm leading-relaxed"
      />

      <View className="absolute bottom-10 px-10">
        <View className="mb-4 flex flex-row items-center justify-center gap-2">
          <Pressable
            className="h-2 w-2 rounded-full bg-gray-500"
            onPress={() => {
              router.push('/onboarding');
            }}
          />
          <View className="h-4 w-4 rounded-full bg-[#191919]" />
        </View>
        <View className="flex w-full flex-row items-center justify-between">
          <CustomText text="Skip" className="text-gray-500" />
          <Pressable
            className="flex flex-row items-center justify-center gap-1 rounded-full bg-[#191919] p-2"
            onPress={() => {
              completeOnboarding();
            }}>
            <CustomText text="Create Account" className="text-[#d9d9d9]" />
            <ArrowRight className="size-6" color="#d9d9d9" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FinalOnboarding;

const styles = StyleSheet.create({});
