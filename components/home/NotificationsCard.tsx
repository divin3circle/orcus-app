import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomText from '../ui/CustomText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NotificationType } from '@/hooks/useNotifications';
import { useColorScheme } from 'nativewind';

type ExpoIoniconsName = keyof typeof Ionicons.glyphMap;

const NotificationsCard = ({ notification }: { notification: NotificationType }) => {
  const { colorScheme } = useColorScheme();
  const icon: ExpoIoniconsName =
    notification.type !== 'credit' ? 'arrow-up-outline' : 'arrow-down-outline';
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  return (
    <View className="flex flex-row items-center justify-between rounded-3xl bg-input/30 p-4">
      <View className="flex flex-row items-center gap-2">
        <Ionicons name={icon} size={24} color={notification.type === 'credit' ? 'green' : 'red'} />
        <View className="">
          <CustomText text={notification.title} />
          <CustomText text={formatDate(notification.date)} className="text-sm text-foreground/50" />
        </View>
      </View>
      <Text
        style={{
          fontFamily: 'Montserrat',
        }}
        className={`${notification.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
        {`${notification.type === 'credit' ? '+' : '-'}KES ${notification.amount}`}
      </Text>
    </View>
  );
};

export default NotificationsCard;

const styles = StyleSheet.create({});
