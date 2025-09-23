import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CustomText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} className={className}>
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
