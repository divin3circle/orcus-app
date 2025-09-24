import { StyleSheet, ImageBackground, View, Image, Pressable } from 'react-native';
import React from 'react';
import { Shop } from '@/hooks/useShops';
import CustomText from '../ui/CustomText';
import red from '@/assets/images/small-red.png';
import blue from '@/assets/images/small-blue.png';
import Ionicons from '@expo/vector-icons/Ionicons';

const FavoriteShopCard = ({ shop }: { shop: Shop }) => {
  const bgImage = shop.theme === 'red' ? red : blue;
  return (
    <ImageBackground
      source={bgImage}
      className="flex h-[184px] w-[145px] items-center justify-between px-2 py-3">
      <View className="">
        <CustomText text={shop.name} className="text-center text-sm font-semibold text-white" />
      </View>
      <Image className="h-10 w-10 rounded-full" source={shop.profile_image_url} />
      <View className="flex flex-row items-center gap-1">
        <Pressable className="flex flex-row items-center gap-1">
          <Ionicons name="arrow-up-outline" size={16} color="white" />
          <CustomText text="Pay" className="text-sm font-semibold text-white" />
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default FavoriteShopCard;

const styles = StyleSheet.create({});
