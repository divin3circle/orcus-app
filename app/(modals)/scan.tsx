import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import CustomText from '@/components/ui/CustomText';

const Scan = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 p-4">
        <CustomText text="Scan" className="text-center text-lg font-semibold" />
        <CustomText
          text="Scan Merchant QR to Pay"
          className="text-center text-sm text-foreground/50"
        />
        <View className="flex-1 items-center justify-center">
          <Button onPress={requestPermission} title="Grant Camera Permission" />
          <CustomText
            text="We need your permission to show the camera"
            className="text-center text-sm text-foreground/50"
          />
        </View>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View className="p-4">
      <CustomText text="Scan" className="text-center text-lg font-semibold" />
      <CustomText
        text="Scan Merchant QR to Pay"
        className="text-center text-sm text-foreground/50"
      />
      <View className="mt-4">
        <CameraView
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />
      </View>
    </View>
  );
};

export default Scan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
