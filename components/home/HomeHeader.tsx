import { StyleSheet, Image, View, Pressable, Text } from 'react-native';
import React from 'react';
import CustomText from '../ui/CustomText';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useAuthStore } from '@/utils/authStore';

const HomeHeader = () => {
  const { colorScheme } = useColorScheme();
  const { username, accountId, profileImageUrl } = useAuthStore();
  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center gap-2">
        <Avatar alt={`${username}'s Avatar`}>
          <AvatarImage source={{ uri: profileImageUrl }} />
          <AvatarFallback className="border border-foreground/50 bg-foreground">
            <Text
              className="text-background"
              style={{
                fontFamily: 'Montserrat',
              }}>
              {username.charAt(0)}
            </Text>
          </AvatarFallback>
        </Avatar>
        <View className="flex items-start">
          <CustomText text={username} className="font-semibold" />
          <CustomText text={accountId} className="text-sm font-medium text-muted-foreground" />
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
