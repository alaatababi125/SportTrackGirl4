
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#163A35' },
        headerTintColor: '#FFFFFF',
        tabBarActiveTintColor: '#16866A',
        tabBarInactiveTintColor: '#777777',
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Accueil', tabBarLabel: 'Accueil' }} />
      <Tabs.Screen name="statistics" options={{ title: 'Statistiques', tabBarLabel: 'Stats' }} />
      <Tabs.Screen name="camera" options={{ title: 'Caméra', tabBarLabel: 'Caméra' }} />
      <Tabs.Screen name="profile" options={{ title: 'Mon profil', tabBarLabel: 'Profil' }} />
    </Tabs>
  );
}
