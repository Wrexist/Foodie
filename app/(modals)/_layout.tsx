import { Stack } from 'expo-router';
import { colors } from '@/design-system/tokens';

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        presentation: 'modal',
      }}
    >
      <Stack.Screen name="add-review" />
      <Stack.Screen name="add-item" />
      <Stack.Screen name="place-search" />
    </Stack>
  );
}
