import { View, Text, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import CustomText from '@/components/ui/CustomText';
import CustomKeyboards from '@/components/ui/custom-keyboard';

const Buy = () => {
  const [amount, setAmount] = useState('100');
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
    console.log('Confirming purchase:', amount);
  };
  return (
    <View>
      <View className="p-2">
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
            {(Number(amount) * 0.98).toFixed(2)}
          </Text>
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

export default Buy;
