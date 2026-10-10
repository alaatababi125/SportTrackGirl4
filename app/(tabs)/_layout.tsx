import { ProfileProvider } from '../context/ProfileContext';
import { ActivityProvider } from '../context/ActivityContext';

export default function RootLayout() {
  return (
    <ProfileProvider>
      <ActivityProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ActivityProvider>
    </ProfileProvider>
  );
}