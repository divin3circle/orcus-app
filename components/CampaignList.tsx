import React, { useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import CustomText from './ui/CustomText';
import { useShopCampaignManager } from '@/hooks/useCampaigns';
import { formatBalance } from '@/hooks/useBalances';
import { Skeleton } from './ui/skeleton';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CampaignListProps {
  shopId: string;
}

const CampaignList: React.FC<CampaignListProps> = ({ shopId }) => {
  const { campaigns, campaignsLoading, joinOrUpdateCampaign, isLoading, error } =
    useShopCampaignManager(shopId);

  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

  const handleCampaignAction = async (campaignId: string, tokenBalance: number) => {
    setSelectedCampaignId(campaignId);
    try {
      const result = await joinOrUpdateCampaign(campaignId, tokenBalance);
      Alert.alert('Success', result.message || 'Campaign action completed successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to perform campaign action');
    } finally {
      setSelectedCampaignId(null);
    }
  };

  if (campaignsLoading) {
    return (
      <View className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg bg-foreground/20" />
        ))}
      </View>
    );
  }

  if (!campaigns || campaigns.length === 0) {
    return (
      <View className="flex items-center justify-center py-8">
        <Ionicons name="trophy-outline" size={48} color="#666" />
        <CustomText text="No campaigns available" className="mt-2 text-foreground/50" />
      </View>
    );
  }

  return (
    <View className="space-y-4">
      {campaigns.map((campaign) => (
        <View key={campaign.id} className="rounded-xl border border-foreground/20 bg-input/30 p-4">
          {/* Campaign Header */}
          <View className="flex flex-row items-start justify-between">
            <View className="flex-1">
              <CustomText text={campaign.name} className="text-lg font-semibold" />
              <Text className="mt-1 text-sm text-foreground/50">{campaign.description}</Text>
              <Text className="mt-1 text-xs text-foreground/30">Token ID: {campaign.token_id}</Text>
            </View>
            <View className="ml-4">
              {campaign.isUserParticipating ? (
                <View className="flex items-center">
                  <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                  <Text className="mt-1 text-xs text-green-500">Joined</Text>
                </View>
              ) : (
                <View className="flex items-center">
                  <Ionicons name="add-circle-outline" size={24} color="#666" />
                  <Text className="mt-1 text-xs text-foreground/50">Available</Text>
                </View>
              )}
            </View>
          </View>

          {/* Campaign Stats */}
          <View className="mt-4 flex flex-row justify-between">
            <View className="flex items-center">
              <CustomText
                text={formatBalance(campaign.userTokenBalance)}
                className="text-sm font-semibold"
              />
              <Text className="text-xs text-foreground/50">My Balance</Text>
            </View>
            <View className="flex items-center">
              <CustomText
                text={formatBalance(campaign.distributed)}
                className="text-sm font-semibold"
              />
              <Text className="text-xs text-foreground/50">Distributed</Text>
            </View>
            <View className="flex items-center">
              <CustomText text={formatBalance(campaign.target)} className="text-sm font-semibold" />
              <Text className="text-xs text-foreground/50">Target</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View className="mt-4">
            <View className="mb-1 flex flex-row justify-between">
              <Text className="text-xs text-foreground/50">
                {campaign.ended === 0 ? 'Active' : 'Ended'}
              </Text>
              <Text className="text-xs text-foreground/50">
                {((campaign.distributed / campaign.target) * 100).toFixed(1)}%
              </Text>
            </View>
            <View className="h-2 overflow-hidden rounded-full bg-foreground/10">
              <View
                className="h-full rounded-full bg-blue-500"
                style={{
                  width: `${Math.min((campaign.distributed / campaign.target) * 100, 100)}%`,
                }}
              />
            </View>
          </View>

          {/* Action Button */}
          <View className="mt-4">
            <Pressable
              className={`rounded-xl p-3 ${
                campaign.isUserParticipating
                  ? 'border border-blue-500/30 bg-blue-500/20'
                  : 'bg-foreground'
              }`}
              onPress={() => {
                handleCampaignAction(campaign.id, 10); // Always send 10 tokens
              }}
              disabled={isLoading && selectedCampaignId === campaign.id}>
              <View className="flex flex-row items-center justify-center">
                {isLoading && selectedCampaignId === campaign.id ? (
                  <>
                    <Text className="text-sm font-semibold text-foreground/50">Processing...</Text>
                  </>
                ) : (
                  <>
                    <Ionicons
                      name={campaign.isUserParticipating ? 'refresh' : 'add'}
                      size={16}
                      color={campaign.isUserParticipating ? '#3b82f6' : 'white'}
                    />
                    <Text
                      className={`ml-2 text-sm font-semibold ${
                        campaign.isUserParticipating ? 'text-blue-500' : 'text-background'
                      }`}>
                      {campaign.isUserParticipating ? 'Add Tokens (+10)' : 'Join Campaign (+10)'}
                    </Text>
                  </>
                )}
              </View>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

export default CampaignList;
