import { StyleSheet, Text, View, Linking, Pressable } from 'react-native';
import React from 'react';
import { CampaignEntry, useCampaign } from '@/hooks/useCampaigns';
import CustomText from '../ui/CustomText';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '../ui/skeleton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from 'nativewind';
import { formatBalance } from '@/hooks/useBalances';

const CampaignCard = ({ entry }: { entry: CampaignEntry }) => {
  const { data: campaign, isLoading, error } = useCampaign(entry.campaign_id);
  const { colorScheme } = useColorScheme();

  if (isLoading) {
    return <Skeleton className="h-[70px] w-full rounded-lg bg-foreground/20" />;
  }
  if (error) {
    return <CustomText text={`Error: ${error}`} className="mt-2 text-sm" />;
  }
  if (!campaign) {
    return null;
  }
  return (
    <View className="w-full rounded-xl border border-foreground/20 bg-input/30 p-4">
      <View className="flex flex-row items-start gap-2">
        <View className="flex h-12 w-12 items-center justify-center rounded-xl border-[1px] border-foreground/30">
          <Ionicons
            name="timer-outline"
            size={28}
            color={colorScheme === 'light' ? 'black' : 'white'}
          />
        </View>
        <Pressable
          className=""
          onPress={() => Linking.openURL(`https://hashscan.io/testnet/token/${campaign.token_id}`)}>
          <CustomText text={campaign.name} className="text-base font-semibold" />
          <Text className="text-xs text-foreground/50">{campaign.token_id}</Text>
        </Pressable>
      </View>
      <View className="mt-2 flex flex-row items-center justify-around">
        <View className="">
          <CustomText
            text={entry.token_balance.toLocaleString()}
            className="text-sm font-semibold"
          />
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
          <CustomText text={formatBalance(campaign.target)} className="text-base font-semibold" />
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
            text={`${((campaign.distributed / (campaign.target / 100)) * 100).toFixed(2)}%`}
            className="text-xs text-foreground/50"
          />
        </View>
        <Progress value={(campaign.distributed / (campaign.target / 100)) * 100 || 0} />
      </View>
    </View>
  );
};

export default CampaignCard;

const styles = StyleSheet.create({});
