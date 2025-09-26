import { StyleSheet, Image, Text, View } from 'react-native';
import React from 'react';
import { Campaign } from '@/hooks/useCampaigns';
import CustomText from '../ui/CustomText';
import { Progress } from '@/components/ui/progress';

const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
  return (
    <View className="w-full rounded-xl border border-foreground/20 bg-input/30 p-4">
      <View className="flex flex-row items-start gap-2">
        <Image
          source={campaign.icon}
          className="h-12 w-12 rounded-xl border-[1px] border-foreground/30"
        />
        <View className="">
          <CustomText text={campaign.name} className="text-base font-semibold" />
          <Text className="text-xs text-foreground/50">{campaign.token_id}</Text>
        </View>
      </View>
      <View className="mt-2 flex flex-row items-center justify-around">
        <View className="">
          <CustomText text="10.5" className="text-sm font-semibold" />
          <CustomText text="My Balance" className="text-xs text-foreground/50" />
        </View>
        <View className="">
          <CustomText
            text={campaign.distributed.toLocaleString()}
            className="text-base font-semibold"
          />
          <CustomText text="Distributed" className="text-xs text-foreground/50" />
        </View>
        <View className="">
          <CustomText
            text={campaign.target_tokens.toLocaleString()}
            className="text-base font-semibold"
          />
          <CustomText text="Target" className="text-xs text-foreground/50" />
        </View>
      </View>
      <View className="mt-2">
        <View className="mb-1 flex w-full flex-row items-center justify-between">
          <CustomText
            text={campaign.ended === 0 ? 'Active' : 'Ended'}
            className="text-xs text-foreground/50"
          />
          <CustomText
            text={`${((campaign.distributed / campaign.target_tokens) * 100).toFixed(2)}%`}
            className="text-xs text-foreground/50"
          />
        </View>
        <Progress value={(campaign.distributed / campaign.target_tokens) * 100 || 0} />
      </View>
    </View>
  );
};

export default CampaignCard;

const styles = StyleSheet.create({});
