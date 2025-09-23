import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAuthStore } from '@/utils/authStore';
import { router } from 'expo-router';

export default function FinalOnboarding() {
  const { completeOnboarding } = useAuthStore();
  return (
    <View>
      <Text>FinalOnboarding</Text>
      <Button
        title="Finish"
        onPress={() => {
          completeOnboarding();
          router.push('/create-account');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
