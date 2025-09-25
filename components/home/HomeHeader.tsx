import { StyleSheet, Image, View, Pressable } from 'react-native';
import React from 'react';
import CustomText from '../ui/CustomText';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';

const HomeHeader = () => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center gap-2">
        <Avatar alt="Zach Nugent's Avatar">
          <AvatarImage source={{ uri: 'https://github.com/mrzachnugent.png' }} />
          <AvatarFallback>
            <CustomText text="ZN" />
          </AvatarFallback>
        </Avatar>
        <View className="flex items-start">
          <CustomText text="Sylus" className="font-semibold" />
          <CustomText text="0.0.68954" className="text-sm font-medium text-muted-foreground" />
        </View>
      </View>
      <View className="flex flex-row items-center gap-4">
        <Pressable
          onPress={() => {
            router.push('/(modals)/scan');
          }}>
          <Ionicons
            name="qr-code-outline"
            size={24}
            color={colorScheme === 'light' ? 'black' : 'white'}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            router.push('/(modals)/notifications');
          }}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={colorScheme === 'light' ? 'black' : 'white'}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({});
