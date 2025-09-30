import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomText from '../ui/CustomText';
import { Notification } from '@/hooks/useNotifications';
import Ionicons from '@expo/vector-icons/Ionicons';

type ExpoNotificationIcon = keyof typeof Ionicons.glyphMap;

type NotificationOpts = {
  icon: ExpoNotificationIcon;
  color: string;
};

function getNotificationIcon(notificationType: string): NotificationOpts {
  switch (notificationType) {
    case 'transaction':
      return { icon: 'arrow-up-outline', color: 'red' };
    case 'buy':
      return { icon: 'arrow-down-outline', color: 'green' };
    case 'join':
      return { icon: 'add-circle-outline', color: 'blue' };
    case 'update':
      return { icon: 'refresh-outline', color: 'yellow' };
    case 'send':
      return { icon: 'send-outline', color: 'purple' };
    default:
      return { icon: 'information-circle-outline', color: 'gray' };
  }
}

const NotificationsCard = ({ notification }: { notification: Notification }) => {
  const { icon, color } = getNotificationIcon(notification.type);
  return (
    <View className="flex flex-row items-center justify-between rounded-3xl bg-input/30 p-4">
      <View className="flex flex-row items-center gap-2">
        <Ionicons name={icon} size={24} color={color} />
        <View className="">
          <CustomText text={notification.message_content} />
          <CustomText
            text={new Date(notification.timestamp * 1000).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
            className="text-sm text-foreground/50"
          />
        </View>
      </View>
    </View>
  );
};

export default NotificationsCard;

const styles = StyleSheet.create({});
