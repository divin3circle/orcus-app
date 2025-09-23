import { SignUpForm } from '@/components/sign-up-form';
import { ScrollView, View } from 'react-native';

export default function SignUpScreen() {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        contentContainerClassName="flex-grow justify-center">
        <View className="w-full max-w-sm">
          <SignUpForm />
        </View>
      </ScrollView>
    </View>
  );
}
