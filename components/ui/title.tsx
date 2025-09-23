import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const TitleText = ({ title }: { title: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default TitleText;

const styles = StyleSheet.create({
  container: {
    marginBottom: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Montserrat',
  },
});
