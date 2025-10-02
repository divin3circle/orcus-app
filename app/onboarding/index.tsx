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
import animation from '@/assets/lottie/animation1.json';
import CustomText from '@/components/ui/CustomText';
import { ArrowRight } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

const FirstOnboarding = () => {
  const { width } = useWindowDimensions();
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView
      className={`flex-1 items-center justify-center bg-[${colorScheme === 'dark' ? '#000' : '#d9d9d9'}]`}>
      <CustomText text="Welcome to the Orcus App" className="text-2xl" />
      <Lottie
        source={animation}
        autoPlay
        loop
        style={{ width: width * 0.8, height: width * 0.8 }}
      />
      <CustomText
        text="Pay instantly with crypto on the fastest, most
          secure network. Your money, your way - with fees as low as 1 KSH"
        className="text- px-4 text-sm leading-relaxed"
      />

      <View className="px-10">
        <View className="flex flex-row items-center justify-center gap-2">
          <View
            className={`h-4 w-4 rounded-full bg-[${colorScheme === 'dark' ? '#191919' : '#d9d9d9'}]`}
          />
          <Pressable
            className="h-2 w-2 rounded-full bg-gray-500"
            onPress={() => {
              router.push('/onboarding/final');
            }}
          />
        </View>
        <View className="flex w-full flex-row items-center justify-between">
          <CustomText text="Skip" className="text-gray-500" />
          <Pressable
            className={`flex items-center justify-center rounded-full bg-[${colorScheme === 'dark' ? '#191919' : '#d9d9d9'}] p-2`}
            onPress={() => {
              router.push('/onboarding/final');
            }}>
            <ArrowRight className="size-6" color="#d9d9d9" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FirstOnboarding;

const styles = StyleSheet.create({});
