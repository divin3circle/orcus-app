import { Alert, View, Text, Image, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import CustomText from '@/components/ui/CustomText';
import CustomKeyboards from '@/components/ui/custom-keyboard';
import { useBuy, BuyResponse } from '@/hooks/useBuy';
import { useAuthStore } from '@/utils/authStore';
import { useBalances, useKESTBalance, formatBalance } from '@/hooks/useBalances';
import Lottie from 'lottie-react-native';
import animation from '@/assets/lottie/successAnimation.json';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Clipboard } from 'react-native';

const Buy = () => {
  const { id: userId } = useAuthStore();
  const { data: kshBalance } = useKESTBalance();
  const [amount, setAmount] = useState('100');
  const [buySuccess, setBuySuccess] = useState(false);
  const [buyData, setBuyData] = useState<BuyResponse | null>(null);

  const { buy, isLoading: isBuyLoading } = useBuy();
  const { refetch: refetchBalances } = useBalances();
  const handleKeyPress = (key: string) => {
    if (key === 'Ksh') return; // Handle currency toggle if needed

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
      const result = await buy({
        user_id: userId,
        amount: Number(amount),
      });

      setBuyData(result);
      setBuySuccess(true);
      await refetchBalances();
    } catch (error: any) {
      console.error('Buy failed:', error);

      let errorMessage = 'Purchase failed. Please try again.';

      if (error.response?.data?.error === 'insufficient balance') {
        errorMessage = 'Insufficient balance. Please check your account balance.';
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      Alert.alert('Purchase Failed', errorMessage, [{ text: 'OK' }]);
    }
  };

  if (buySuccess) {
    return (
      <View className="flex justify-center p-4">
        <View className="flex w-full items-center justify-center">
          <Lottie source={animation} autoPlay loop={false} style={{ width: 200, height: 200 }} />
          <CustomText text="Purchase Successful" className="text-lg font-semibold" />
          <Text
            className="text-sm text-foreground/50"
            style={{
              fontFamily: 'Montserrat',
            }}>
            {buyData?.message ||
              `Your purchase of KES ${formatBalance(Number(amount))} was successful`}
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
                  Clipboard.setString(buyData?.transaction_id || '');
                  Alert.alert('Copied to clipboard');
                }}>
                <Text className="text-sm text-foreground/50">
                  {buyData?.transaction_id?.slice(0, 12) + '...' || ''}
                </Text>
                <Ionicons name="copy-outline" size={16} color="orange" />
              </Pressable>
            </View>
            <View className="flex flex-row items-center justify-between">
              <CustomText text="Amount" className="font-semibold" />
              <Text className="text-sm text-foreground/50">
                KSH {formatBalance(Number(amount) * 100)}
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between">
              <CustomText text="Date" className="font-semibold" />
              <Text className="text-sm text-foreground/50">{new Date().toLocaleDateString()}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View>
      <View className="mt-4 px-4 py-2">
        <CustomText text="Buy" className="text-lg font-semibold" />
        <Text
          className="text-sm text-foreground/50"
          style={{
            fontFamily: 'Montserrat',
          }}>
          Buy KSH with M-Pesa
        </Text>
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
          <CustomText text={`KES ${formatBalance(kshBalance)}`} className="text-lg font-semibold" />
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
      <View className="mt-1 p-4">
        <Text
          className="text-sm font-bold text-foreground/50"
          style={{
            fontFamily: 'Montserrat',
          }}>
          You will receive
        </Text>
        <View className="mt-4 flex flex-row items-center gap-1">
          <Text
            className="text-4xl font-semibold text-blue-500"
            style={{
              fontFamily: 'Montserrat',
            }}>
            KSH
          </Text>
          <Text className="text-4xl font-semibold text-foreground">
            {Number(amount).toFixed(2)}
          </Text>
        </View>
      </View>
      <CustomKeyboards
        onKeyPress={handleKeyPress}
        onClear={handleClear}
        onBackspace={handleBackspace}
        onConfirm={handleConfirm}
        isLoading={isBuyLoading}
      />
    </View>
  );
};

export default Buy;
