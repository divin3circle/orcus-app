import { Pressable, StyleSheet, Linking, View } from 'react-native';
import React from 'react';
import CustomText from '../ui/CustomText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from 'nativewind';
import { useAuthStore } from '@/utils/authStore';

const PersonalInformation = () => {
  const { colorScheme } = useColorScheme();
  const { username, mobileNumber, accountId, topicId } = useAuthStore();
  return (
    <View className="mx-2 mt-4 rounded-xl bg-input/30 p-4">
      <View className="flex flex-row items-center justify-between">
        <CustomText text="Personal Information" className="text-md font-semibold" />
        <Pressable className="" onPress={() => {}}>
          <CustomText text="Edit" className="text-xs text-primary" />
        </Pressable>
      </View>
      <View className="my-2 flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-3">
          <Ionicons
            name="person-outline"
            size={26}
            color={colorScheme === 'light' ? 'black' : 'white'}
          />
          <View className="">
            <CustomText text="Username" className="text-xs text-muted-foreground" />
            <CustomText text={username} className="text-sm" />
          </View>
        </View>
      </View>
      <View className="my-2 flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-3">
          <Ionicons
            name="call-outline"
            size={26}
            color={colorScheme === 'light' ? 'black' : 'white'}
          />
          <View className="">
            <CustomText text="Mobile Number" className="text-xs text-muted-foreground" />
            <CustomText text={mobileNumber} className="text-sm" />
          </View>
        </View>
      </View>
      <View className="my-2 flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-3">
          <Ionicons
            name="key-outline"
            size={26}
            color={colorScheme === 'light' ? 'black' : 'white'}
          />
          <Pressable
            className=""
            onPress={() => {
              Linking.openURL(`https://hashscan.io/testnet/account/${accountId}`);
            }}>
            <CustomText text="Hedera Account ID" className="text-xs text-muted-foreground" />
            <CustomText text={accountId} className="text-sm" />
          </Pressable>
        </View>
      </View>
      <View className="my-2 flex flex-row items-center justify-between">
        <Pressable className="flex flex-row items-center gap-3">
          <Ionicons
            name="notifications-outline"
            size={26}
            color={colorScheme === 'light' ? 'black' : 'white'}
          />
          <Pressable
            className=""
            onPress={() => {
              Linking.openURL(`https://hashscan.io/testnet/topic/${topicId}`);
            }}>
            <CustomText text="Topic ID" className="text-xs text-muted-foreground" />
            <CustomText text={topicId} className="text-sm" />
          </Pressable>
        </Pressable>
      </View>
    </View>
  );
};

export default PersonalInformation;

const styles = StyleSheet.create({});
