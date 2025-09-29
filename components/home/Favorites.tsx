import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomText from '../ui/CustomText';
import FavoriteShopCard from './FavoriteShopCard';
import { useUserStore } from '@/utils/userStore';

const Favorites = () => {
  const { favoriteShops } = useUserStore();
  return (
    <View className="mt-4">
      <CustomText text="Favorites" className="text-lg font-semibold" />
      <View className="mt-2 flex flex-row items-center gap-2">
        {favoriteShops.map((shop) => (
          <FavoriteShopCard key={shop.id} shop={shop} />
        ))}
      </View>
      {favoriteShops.length === 0 && (
        <CustomText
          text="No favorites yet"
          className="my-4 text-center text-sm text-muted-foreground"
        />
      )}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({});
