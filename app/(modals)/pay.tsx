import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import CustomText from '@/components/ui/CustomText';

const Pay = () => {
  return (
    <View className="p-4">
      <View className="">
        <CustomText text="Pay Merchant" className="text-lg font-semibold" />
      </View>
      <View className="">
        <View className="mt-4 flex flex-row items-center gap-2">
          <TextInput
            placeholder="Paste Shop Payment ID"
            className="h-12 flex-1 border-b border-foreground/30 text-lg font-semibold text-foreground/60"
            style={{
              fontFamily: 'Montserrat',
            }}
          />
        </View>
        <View className="mt-14 flex flex-row items-center gap-4">
          <Image source={require('@/assets/images/ksh.png')} className="h-16 w-16 rounded-full" />
          <View className="">
            <Text
              className="text-sm font-semibold text-foreground/50"
              style={{
                fontFamily: 'Montserrat',
              }}>
              Current Balance
            </Text>
            <CustomText text="KES 0.00" className="mt-1 text-lg font-semibold" />
          </View>
        </View>
        <View className="mt-14">
          <Text
            className="text-sm font-bold text-foreground/50"
            style={{
              fontFamily: 'Montserrat',
            }}>
            Enter Amount
          </Text>
          <View className="mt-4 flex flex-row items-center gap-1">
            <Text
              className="text-4xl font-semibold text-[#d3f562]"
              style={{
                fontFamily: 'Montserrat',
              }}>
              KES
            </Text>
            <TextInput
              placeholder="0.00"
              className="text-4xl font-semibold text-foreground"
              style={{
                fontFamily: 'Montserrat',
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({});
