import { SignInForm } from '@/components/sign-in-form';
import { ScrollView, View } from 'react-native';

export default function SignInScreen() {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        contentContainerClassName="flex-grow justify-center">
        <View className="w-full max-w-sm">
          <SignInForm />
        </View>
      </ScrollView>
    </View>
  );
}
