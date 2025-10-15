import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from '@/components/ui/CustomText';
import CustomKeyboards from '@/components/ui/custom-keyboard';
import { useAuthStore } from '@/utils/authStore';

const Send = () => {
  const [amount, setAmount] = useState('0');
  const [paymentId, setPaymentId] = useState('');

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

  const handleConfirm = () => {
    console.log('Confirming payment:', amount);
  };

  return (
    <View className="">
      <View className="mt-4 p-4">
        <CustomText text="Send KSH" className="text-lg font-semibold" />
        <Text
          className="text-sm text-foreground/50"
          style={{
            fontFamily: 'Montserrat',
          }}>
          Send KSH to a friend
        </Text>
      </View>
      <View className="">
        <View className="flex flex-row items-center gap-2 p-4">
          <TextInput
            placeholder="Enter Phone Number"
            value={paymentId}
            onChangeText={setPaymentId}
            className="h-12 flex-1 border-b border-foreground/30 text-lg font-semibold text-foreground/60"
            style={{
              fontFamily: 'Montserrat',
            }}
          />
        </View>
        <View className="flex flex-row items-center gap-2 p-4">
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
              Available Balance
            </Text>
            <CustomText text="KES 0.00" className="text-lg font-semibold" />
          </View>
        </View>
        <View className="p-4">
          <Text
            className="text-sm font-bold text-foreground/50"
            style={{
              fontFamily: 'Montserrat',
            }}>
            Enter Amount to Send
          </Text>
          <View className="mt-4 flex flex-row items-center gap-1">
            <Text
              className="text-4xl font-semibold text-blue-500"
              style={{
                fontFamily: 'Montserrat',
              }}>
              KSH
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

export default Send;

const styles = StyleSheet.create({});
