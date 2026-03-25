import { Stack } from 'expo-router';
import { colors } from '@/design-system/tokens';

export default function JournalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
