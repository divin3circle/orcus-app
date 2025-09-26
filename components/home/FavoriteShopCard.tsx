import { StyleSheet, ImageBackground, View, Image, Pressable, Text } from 'react-native';
import React from 'react';
import { Shop } from '@/hooks/useShops';
import CustomText from '../ui/CustomText';
import red from '@/assets/images/small-red.png';
import blue from '@/assets/images/small-blue.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuthStore } from '@/utils/authStore';
import { router } from 'expo-router';

const FavoriteShopCard = ({ shop }: { shop: Shop }) => {
  const bgImage = shop.theme === 'red' ? red : blue;
  const { setPaymentID } = useAuthStore();

  const handlePay = () => {
    setPaymentID(shop.payment_id);
    router.push('/(modals)/pay');
  };
  return (
    <ImageBackground
      source={bgImage}
      className="flex h-[184px] w-[145px] items-center justify-between px-2 py-3">
      <View className="">
        <Text
          className="text-sm font-semibold text-white"
          style={{
            fontFamily: 'Montserrat',
          }}>
          {shop.name}
        </Text>
      </View>
      <Image className="h-10 w-10 rounded-full" source={shop.profile_image_url} />
      <View className="flex flex-row items-center gap-1">
        <Pressable className="flex flex-row items-center gap-1" onPress={handlePay}>
          <Ionicons name="arrow-up-outline" size={16} color="white" />
          <Text
            className="text-sm font-semibold text-white"
            style={{
              fontFamily: 'Montserrat',
            }}>
            Pay
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default FavoriteShopCard;

const styles = StyleSheet.create({});
