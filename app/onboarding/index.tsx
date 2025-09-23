import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import Lottie from 'lottie-react-native';
import animation from '@/assets/lottie/animation1.json';

const FirstOnboarding = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text>FirstOnboarding</Text>
      <Lottie source={animation} autoPlay loop style={{ width: 200, height: 200 }} />
      <Button
        title="Next"
        onPress={() => {
          router.push('/onboarding/final');
        }}
      />
    </SafeAreaView>
  );
};

export default FirstOnboarding;

const styles = StyleSheet.create({});
