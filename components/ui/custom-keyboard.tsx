import { Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from 'nativewind';

type ExpoIconName = keyof typeof Ionicons.glyphMap;

const leftKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Ksh', '0', '.'];

const LeftKey = ({
  item,
  onPress,
  disabled,
}: {
  item: string;
  onPress: () => void;
  disabled?: boolean;
}) => {
  return (
    <Pressable
      className={`flex h-20 w-[30%] items-center justify-center rounded-xl border border-foreground/30 px-4 py-2 ${
        disabled ? 'bg-input/10 opacity-50' : 'bg-input/30'
      }`}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}>
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
  disabled,
}: {
  item: string;
  icon: ExpoIconName;
  onPress: () => void;
  disabled?: boolean;
}) => {
  const { colorScheme } = useColorScheme();
  return (
    <Pressable
      className={`flex h-20 w-full items-center justify-center rounded-xl border border-foreground/30 px-4 py-2 ${
        disabled ? 'bg-input/10 opacity-50' : 'bg-input/50'
      }`}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}>
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
  isLoading?: boolean;
}

const CustomKeyboards = ({
  onKeyPress = () => {},
  onClear = () => {},
  onBackspace = () => {},
  onConfirm = () => {},
  isLoading = false,
}: CustomKeyboardsProps) => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="mt-2 flex flex-row items-center gap-1 px-2">
      <View className="mt-2 flex w-[75%] flex-row flex-wrap justify-around gap-2">
        {leftKeys.map((key, index) => (
          <LeftKey
            key={index.toString()}
            item={key}
            onPress={() => onKeyPress(key)}
            disabled={isLoading}
          />
        ))}
      </View>
      <View className="mt-2 flex w-[25%] flex-col gap-2">
        <RightKey
          item="Back"
          icon="close-circle-outline"
          onPress={onBackspace}
          disabled={isLoading}
        />
        <RightKey item="Back" icon="trash-outline" onPress={onClear} disabled={isLoading} />
        <Pressable
          className={`flex h-[168px] w-full items-center justify-center rounded-xl px-4 py-2 ${
            isLoading ? 'bg-foreground/50' : 'bg-foreground'
          }`}
          onPress={isLoading ? undefined : onConfirm}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color={colorScheme !== 'light' ? 'black' : 'white'} />
          ) : (
            <Ionicons
              name="checkmark-outline"
              size={20}
              color={colorScheme !== 'light' ? 'black' : 'white'}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default CustomKeyboards;

const styles = StyleSheet.create({});
