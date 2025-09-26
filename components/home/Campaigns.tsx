import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomText from '../ui/CustomText';
import { mockCampaigns } from '@/mocks';
import CampaignCard from './CampaignCard';

const Campaigns = () => {
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
