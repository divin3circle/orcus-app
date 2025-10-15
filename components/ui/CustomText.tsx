import { StyleSheet, Text, View, Platform } from 'react-native';
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

  const getFontFamily = () => {
    if (Platform.OS === 'android') {
      if (className?.includes('font-semibold') || className?.includes('font-bold')) {
        return 'FunnelDisplay-SemiBold';
      }
      return 'FunnelDisplay-Regular';
    } else {
      return 'FunnelDisplay-Regular';
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          {
            color: colorScheme === 'light' ? 'black' : 'white',
            fontFamily: getFontFamily(),
          },
        ]}
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
    // fontFamily will be set dynamically based on platform and weight
  },
});
