import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from 'nativewind';

type ExpoIconName = keyof typeof Ionicons.glyphMap;

const leftKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Ksh', '0', '.'];

const LeftKey = ({ item, onPress }: { item: string; onPress: () => void }) => {
  return (
    <Pressable
      className="flex h-20 w-[30%] items-center justify-center rounded-xl border border-foreground/30 bg-input/30 px-4 py-2"
      onPress={onPress}>
      <Text
        className="text-sm font-semibold text-foreground"
        style={{
          fontFamily: 'Montserrat',
        }}>
        {item}
      </Text>
    </Pressable>
  );
};

const RightKey = ({
  item,
  icon,
  onPress,
}: {
  item: string;
  icon: ExpoIconName;
  onPress: () => void;
}) => {
  const { colorScheme } = useColorScheme();
  return (
    <Pressable
      className="flex h-20 w-full items-center justify-center rounded-xl border border-foreground/30 bg-input/50 px-4 py-2"
      onPress={onPress}>
      <Text
        className="text-sm font-semibold text-foreground"
        style={{
          fontFamily: 'Montserrat',
        }}>
        <Ionicons name={icon} size={20} color={colorScheme === 'light' ? 'black' : 'white'} />
      </Text>
    </Pressable>
  );
};

interface CustomKeyboardsProps {
  onKeyPress?: (key: string) => void;
  onClear?: () => void;
  onBackspace?: () => void;
  onConfirm?: () => void;
}

const CustomKeyboards = ({
  onKeyPress = () => {},
  onClear = () => {},
  onBackspace = () => {},
  onConfirm = () => {},
}: CustomKeyboardsProps) => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="mt-2 flex flex-row items-center gap-1 px-2">
      <View className="mt-2 flex w-[75%] flex-row flex-wrap justify-around gap-2">
        {leftKeys.map((key, index) => (
          <LeftKey key={index.toString()} item={key} onPress={() => onKeyPress(key)} />
        ))}
      </View>
      <View className="mt-2 flex w-[25%] flex-col gap-2">
        <RightKey item="Back" icon="close-circle-outline" onPress={onBackspace} />
        <RightKey item="Back" icon="trash-outline" onPress={onClear} />
        <Pressable
          className="flex h-[168px] w-full items-center justify-center rounded-xl bg-foreground px-4 py-2"
          onPress={onConfirm}>
          <Text
            className="text-sm font-semibold text-foreground"
            style={{
              fontFamily: 'Montserrat',
            }}>
            <Ionicons
              name="checkmark-outline"
              size={20}
              color={colorScheme !== 'light' ? 'black' : 'white'}
            />
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CustomKeyboards;

const styles = StyleSheet.create({});
