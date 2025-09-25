import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomText from '@/components/ui/CustomText';
import NotificationsCard from '@/components/home/NotificationsCard';
import { mockNotifications } from '@/mocks';

const Notifications = () => {
  return (
    <View className="p-4">
      <CustomText text="Notifications" className="text-lg font-semibold" />
      <CustomText
        text="Track your transactions and notifications"
        className="text-sm text-muted-foreground"
      />
      <View className="mt-4 flex flex-col gap-2">
        {mockNotifications.map((notification) => (
          <NotificationsCard key={notification.title} notification={notification} />
        ))}
      </View>
      {mockNotifications.length === 0 && (
        <View className="mt-4 flex flex-col items-center justify-center">
          <CustomText text="No notifications found" className="text-muted-foreground" />
        </View>
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
