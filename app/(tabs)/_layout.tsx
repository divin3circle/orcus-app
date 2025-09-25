import CustomNavbar from '@/components/home/CustomNavbar';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <CustomNavbar {...props} />}>
      <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false }} />
      <Tabs.Screen name="agents" options={{ title: 'AI Agents', headerShown: false }} />
      <Tabs.Screen name="transactions" options={{ title: 'Transactions', headerShown: false }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', headerShown: false }} />
    </Tabs>
  );
}
