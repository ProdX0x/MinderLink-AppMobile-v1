import { Tabs } from 'expo-router';
import { Lock, Users } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ size, color }) => (
            <Users size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="private"
        options={{
          title: 'Privé',
          tabBarIcon: ({ size, color }) => (
            <Lock size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}