import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CustomText from '@/components/ui/CustomText';
import NotificationsCard from '@/components/home/NotificationsCard';
import { useNotifications } from '@/hooks/useNotifications';
import { Skeleton } from '@/components/ui/skeleton';

const Notifications = () => {
  const { data, isLoading, error } = useNotifications();
  const [limit, setLimit] = useState(5);
  if (isLoading) {
    return (
      <View className="p-4">
        <CustomText text="Notifications" className="text-lg font-semibold" />
        <CustomText
          text="Track your transactions and notifications"
          className="text-sm text-muted-foreground"
        />
        <View className="mt-4 flex flex-col gap-2">
          <Skeleton className="h-[70px] w-full rounded-3xl bg-foreground/20" />
          <Skeleton className="h-[70px] w-full rounded-3xl bg-foreground/20" />
          <Skeleton className="h-[70px] w-full rounded-3xl bg-foreground/20" />
          <Skeleton className="h-[70px] w-full rounded-3xl bg-foreground/20" />
        </View>
      </View>
    );
  }
  if (error) {
    return (
      <View className="p-4">
        <CustomText text="Error" className="text-lg font-semibold" />
        <Text>{error.message}</Text>
      </View>
    );
  }
  if (!data) {
    return (
      <View className="p-4">
        <CustomText text="Notifications" className="text-lg font-semibold" />
        <CustomText
          text="Track your transactions and notifications"
          className="text-sm text-muted-foreground"
        />
        <View className="mt-4 flex flex-col items-center justify-center">
          <CustomText text="No notifications found" className="text-muted-foreground" />
        </View>
      </View>
    );
  }

  return (
    <ScrollView className="p-4">
      <CustomText text="Notifications" className="text-lg font-semibold" />
      <CustomText
        text="Track your transactions and notifications"
        className="text-sm text-muted-foreground"
      />
      <View className="mt-4 flex flex-col-reverse gap-2">
        {data.slice(0, limit).map((notification) => (
          <NotificationsCard key={notification.timestamp} notification={notification} />
        ))}
      </View>
      {data.length === 0 && (
        <View className="mt-4 flex flex-col items-center justify-center">
          <CustomText text="No notifications found" className="text-muted-foreground" />
        </View>
      )}
      {data.length > limit && (
        <Pressable
          className="mt-4 flex flex-col items-center justify-center"
          onPress={() => setLimit(data.length)}>
          <CustomText text="View All" className="text-muted-foreground" />
        </Pressable>
      )}
      {data.length === limit && (
        <Pressable
          className="mt-4 flex flex-col items-center justify-center"
          onPress={() => setLimit(3)}>
          <CustomText text="Hide" className="text-muted-foreground" />
        </Pressable>
      )}
    </ScrollView>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
