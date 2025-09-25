import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useColorScheme } from 'nativewind';

const CustomText = ({
  text,
  className,
  overwriteColor,
}: {
  text: string;
  className?: string;
  overwriteColor?: boolean;
}) => {
  const { colorScheme } = useColorScheme();
  return (
    <View style={styles.container}>
      <Text
        style={[styles.text, { color: colorScheme === 'light' ? 'black' : 'white' }]}
        className={className}>
        {text}
      </Text>
    </View>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  container: {},
  text: {
    fontFamily: 'Montserrat',
  },
});
