import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomText from '../ui/CustomText';
import CampaignCard from './CampaignCard';
import { useCampaigns } from '@/hooks/useCampaigns';
import { Skeleton } from '../ui/skeleton';
import { mockCampaigns } from '@/mocks';

const Campaigns = () => {
  const { data, isLoading, error } = useCampaigns();

  if (isLoading) {
    return (
      <View className="mt-8">
        <CustomText text="My Campaigns" className="text-lg font-semibold" />
        <View className="mt-2 flex items-center gap-2">
          <Skeleton className="h-[70px] w-full rounded-lg bg-foreground/20" />
          <Skeleton className="h-[70px] w-full rounded-lg bg-foreground/20" />
          <Skeleton className="h-[70px] w-full rounded-lg bg-foreground/20" />
        </View>
      </View>
    );
  }
  if (error) {
    return (
      <View className="mt-8">
        <CustomText text="Error" className="text-lg font-semibold" />
      </View>
    );
  }
  if (!data || data.length === 0) {
    return (
      <View className="mt-8">
        <CustomText text="My Campaigns" className="text-lg font-semibold" />
        <CustomText
          text="No campaigns found"
          className="mt-2 text-center text-sm text-muted-foreground"
        />
      </View>
    );
  }
  return (
    <View className="mt-8">
      <CustomText text="My Campaigns" className="text-lg font-semibold" />
      <View className="mt-2 flex items-center gap-2">
        {mockCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </View>
    </View>
  );
};

export default Campaigns;

const styles = StyleSheet.create({});
