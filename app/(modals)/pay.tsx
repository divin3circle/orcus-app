import {
  Alert,
  Clipboard,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from '@/components/ui/CustomText';
import CustomKeyboards from '@/components/ui/custom-keyboard';
import { useAuthStore } from '@/utils/authStore';
import Lottie from 'lottie-react-native';
import animation from '@/assets/lottie/successAnimation.json';
import { usePay, TransactionResponse } from '@/hooks/usePay';
import { formatBalance, useBalances, useKESTBalance } from '@/hooks/useBalances';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUserStore } from '@/utils/userStore';
import { useGetShopByID } from '@/hooks/useShops';
import { useShopCampaignManager } from '@/hooks/useCampaigns';

const Pay = () => {
  const { paymentID, username } = useAuthStore();
  const { data: kshBalance } = useKESTBalance();
  const [amount, setAmount] = useState('0');
  const [paymentId, setPaymentId] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionData, setTransactionData] = useState<TransactionResponse | null>(null);
  const { addFavoriteShop, isLoading: isLoadingFavoriteShop } = useUserStore();
  const { data: shop } = useGetShopByID(paymentId);
  const {
    campaigns,
    joinOrUpdateCampaign,
    isLoading: isCampaignLoading,
  } = useShopCampaignManager(paymentId);

  const { pay, isLoading: isPaymentLoading } = usePay();
  const { refetch: refetchBalances } = useBalances();

  useEffect(() => {
    setPaymentId(paymentID);
  }, [paymentID]);

  const handleKeyPress = (key: string) => {
    if (key === 'Ksh') return;

    if (amount === '0' && key !== '.') {
      setAmount(key);
    } else {
      setAmount((prev) => prev + key);
    }
  };

  const handleClear = () => {
    setAmount('0');
  };

  const handleBackspace = () => {
    if (amount.length > 1) {
      setAmount((prev) => prev.slice(0, -1));
    } else {
      setAmount('0');
    }
  };

  const handleQuickAmount = (quickAmount: string) => {
    setAmount(quickAmount);
  };

  const handleConfirm = async () => {
    if (amount === '0') {
      return;
    }

    try {
      const result = await pay({
        shop_id: paymentId,
        username: username,
        amount: Number(amount),
      });

      setTransactionData(result.data);
      setPaymentSuccess(true);

      await refetchBalances();
    } catch (error: any) {
      console.error('Payment failed:', error);

      // Show Alert with the error message
      let errorMessage = 'Payment failed. Please try again.';

      if (error.response?.data?.error === 'insufficient balance') {
        errorMessage = 'Insufficient balance. Please check your account balance.';
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      Alert.alert('Payment Failed', errorMessage, [{ text: 'OK' }]);
    }
  };

  const handleSaveShop = () => {
    if (shop) {
      addFavoriteShop(shop);
      Alert.alert('Shop saved to favorites');
    }
  };

  const handleJoinCampaign = async () => {
    if (!campaigns || campaigns.length === 0) {
      Alert.alert('No campaigns available', 'This shop has no active campaigns.');
      return;
    }

    const availableCampaign = campaigns.find((c) => !c.isUserParticipating) || campaigns[0];

    try {
      await joinOrUpdateCampaign(availableCampaign.id, 10);
      Alert.alert('Success', `Joined ${availableCampaign.name} campaign!`);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to join campaign');
    }
  };

  if (paymentSuccess) {
    return (
      <View className="flex justify-center p-4">
        <View className="flex w-full items-center justify-center">
          <Lottie source={animation} autoPlay loop={false} style={{ width: 200, height: 200 }} />
          <CustomText text="Payment Successful" className="text-lg font-semibold" />
          <Text
            className="text-sm text-foreground/50"
            style={{
              fontFamily: 'Montserrat',
            }}>
            Your payment of KES {formatBalance(transactionData?.transaction?.amount)} was successful
          </Text>
        </View>
        <View className="mt-6">
          <CustomText text="Transaction Details" className="text-lg font-semibold" />
          <View className="mt-4 flex gap-4 rounded-xl border border-foreground/20 bg-input/30 p-4">
            <View className="flex flex-row items-center justify-between">
              <CustomText text="Transaction ID" className="font-semibold" />
              <Pressable
                className="flex flex-row items-center gap-2"
                onPress={() => {
                  Clipboard.setString(transactionData?.hedera_transaction.transactionID || '');
                  Alert.alert('Copied to clipboard');
                }}>
                <Text className="text-sm text-foreground/50">
                  {transactionData?.hedera_transaction.transactionID.slice(0, 12) + '...' || ''}
                </Text>
                <Ionicons name="copy-outline" size={16} color="orange" />
              </Pressable>
            </View>
            <View className="flex flex-row items-center justify-between">
              <CustomText text="Shop ID" className="font-semibold" />
              <Text className="text-sm text-foreground/50">
                {transactionData?.transaction?.shop_id?.slice(0, 6) + '...' || ''}
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between">
              <CustomText text="Merchant ID" className="font-semibold" />
              <Text className="text-sm text-foreground/50">
                {transactionData?.transaction?.merchant_id?.slice(0, 6) + '...' || ''}
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between">
              <CustomText text="Amount" className="font-semibold" />
              <Text className="text-sm text-foreground/50">
                KSH {formatBalance(transactionData?.transaction?.amount)}
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between">
              <CustomText text="Fee" className="font-semibold" />
              <Text className="text-sm text-foreground/50">
                KSH {transactionData?.transaction?.fee || (Number(amount) * 0.005).toFixed(2)}
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between">
              <CustomText text="Date" className="font-semibold" />
              <Text className="text-sm text-foreground/50">
                {transactionData?.transaction?.created_at
                  ? new Date(transactionData.transaction.created_at).toLocaleDateString()
                  : new Date().toLocaleDateString()}
              </Text>
            </View>
          </View>
          <View className="mt-8 flex flex-row items-center justify-between">
            <Pressable
              className="flex w-[45%] flex-row items-center justify-center gap-2 rounded-xl border border-foreground/50 bg-input/30 p-4"
              onPress={handleJoinCampaign}
              disabled={isCampaignLoading}>
              <Text
                className="text-sm font-semibold text-foreground"
                style={{
                  fontFamily: 'Montserrat',
                }}>
                {isCampaignLoading ? 'Joining...' : 'Join Campaign'}
              </Text>
            </Pressable>
            <Pressable
              className="flex w-[45%] flex-row items-center justify-center gap-2 rounded-xl bg-foreground p-4"
              onPress={handleSaveShop}
              disabled={isLoadingFavoriteShop}>
              <Text
                className="text-sm font-semibold text-background"
                style={{
                  fontFamily: 'Montserrat',
                }}>
                {isLoadingFavoriteShop ? 'Saving...' : 'Save Shop'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="">
      <View className="mt-4 p-4">
        <CustomText text="Pay Merchant" className="text-lg font-semibold" />
      </View>
      <View className="">
        <View className="flex flex-row items-center gap-2 p-4">
          <TextInput
            placeholder="Paste Shop Payment ID"
            value={paymentId}
            onChangeText={setPaymentId}
            className="h-12 flex-1 border-b border-foreground/30 text-lg font-semibold text-foreground/60"
            style={{
              fontFamily: 'Montserrat',
            }}
          />
        </View>
        <View className="mt-2 flex flex-row items-center gap-2 p-4">
          <Image
            source={require('@/assets/images/ksh.png')}
            className="h-14 w-14 rounded-full border border-foreground/50"
          />
          <View className="">
            <Text
              className="text-sm font-semibold text-foreground/50"
              style={{
                fontFamily: 'Montserrat',
              }}>
              Current Balance
            </Text>
            <CustomText
              text={`KES ${formatBalance(kshBalance)}`}
              className="text-lg font-semibold"
            />
          </View>
        </View>
        <View className="mt-1 p-4">
          <Text
            className="text-sm font-bold text-foreground/50"
            style={{
              fontFamily: 'Montserrat',
            }}>
            Enter Amount
          </Text>
          <View className="mt-4 flex flex-row items-center gap-1">
            <Text
              className="text-4xl font-semibold text-blue-500"
              style={{
                fontFamily: 'Montserrat',
              }}>
              KES
            </Text>
            <TextInput
              placeholder="0.00"
              value={amount}
              editable={false}
              showSoftInputOnFocus={false}
              className="mt-[0.5px] text-4xl font-semibold text-foreground"
              style={{
                fontFamily: 'Montserrat',
              }}
            />
          </View>
        </View>
        <View className="mt-1 flex flex-row items-center justify-between gap-2 px-2">
          <Pressable
            className="flex w-[30%] items-center justify-center rounded-xl border border-foreground/50 bg-input/30 px-4 py-2"
            onPress={() => handleQuickAmount('10')}>
            <CustomText text="KES 10" className="text-sm font-semibold" />
          </Pressable>
          <Pressable
            className="flex w-[30%] items-center justify-center rounded-xl border border-foreground/50 bg-input/30 px-4 py-2"
            onPress={() => handleQuickAmount('100')}>
            <CustomText text="KES 100" className="text-sm font-semibold" />
          </Pressable>
          <Pressable
            className="flex w-[30%] items-center justify-center rounded-xl border border-foreground/50 bg-input/30 px-4 py-2"
            onPress={() => handleQuickAmount('500')}>
            <CustomText text="KES 500" className="text-sm font-semibold" />
          </Pressable>
        </View>
      </View>

      <CustomKeyboards
        onKeyPress={handleKeyPress}
        onClear={handleClear}
        onBackspace={handleBackspace}
        onConfirm={handleConfirm}
        isLoading={isPaymentLoading}
      />
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({});
