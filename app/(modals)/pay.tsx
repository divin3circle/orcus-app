import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from '@/components/ui/CustomText';
import CustomKeyboards from '@/components/ui/custom-keyboard';
import { useAuthStore } from '@/utils/authStore';
import Lottie from 'lottie-react-native';
import animation from '@/assets/lottie/successAnimation.json';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from 'nativewind';

const Pay = () => {
  const { paymentID } = useAuthStore();
  const { colorScheme } = useColorScheme();
  const [amount, setAmount] = useState('0');
  const [paymentId, setPaymentId] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    setPaymentId(paymentID);
  }, [paymentID]);

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

  const handleConfirm = () => {
    if (amount === '0') {
      return;
    }
    console.log('Confirming payment:', amount);
    setPaymentSuccess(true);
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
            You payment of KES {amount} was successful
          </Text>
        </View>
        <View className="mt-12">
          <CustomText text="Transaction Details" className="text-lg font-semibold" />
          <View className="mt-4 flex gap-4 rounded-xl border border-foreground/20 bg-input/30 p-4">
            <View className="flex flex-row items-center justify-between">
              <CustomText text="Transaction ID" className="font-semibold" />
              <Text className="text-sm text-foreground/50">{paymentID}</Text>
            </View>
            <View className="flex flex-row items-center justify-between">
              <CustomText text="Shop ID" className="font-semibold" />
              <Text className="text-sm text-foreground/50">{paymentID}</Text>
            </View>
            <View className="flex flex-row items-center justify-between">
              <CustomText text="Merchant ID" className="font-semibold" />
              <Text className="text-sm text-foreground/50">{paymentID}</Text>
            </View>
            <View className="flex flex-row items-center justify-between">
              <CustomText text="Amount" className="font-semibold" />
              <Text className="text-sm text-foreground/50">KSH {amount}</Text>
            </View>
            <View className="flex flex-row items-center justify-between">
              <CustomText text="Fee" className="font-semibold" />
              <Text className="text-sm text-foreground/50">
                KSH {(Number(amount) * 0.005).toFixed(2)}
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between">
              <CustomText text="Date" className="font-semibold" />
              <Text className="text-sm text-foreground/50">{new Date().toLocaleDateString()}</Text>
            </View>
          </View>
          <View className="mt-8 flex flex-row items-center justify-between">
            <Pressable className="flex w-[45%] flex-row items-center justify-center gap-2 rounded-xl bg-blue-500 p-4">
              <Text
                className="text-sm font-semibold text-background"
                style={{
                  fontFamily: 'Montserrat',
                }}>
                Join Campaign
              </Text>
            </Pressable>
            <Pressable className="flex w-[45%] flex-row items-center justify-center gap-2 rounded-xl bg-foreground p-4">
              <Text
                className="text-sm font-semibold text-background"
                style={{
                  fontFamily: 'Montserrat',
                }}>
                Save Shop
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="">
      <View className="p-4">
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
            <CustomText text="KES 0.00" className="text-lg font-semibold" />
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
      />
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({});
