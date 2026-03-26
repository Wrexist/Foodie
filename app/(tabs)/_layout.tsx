import { Tabs } from 'expo-router';
import { colors } from '@/design-system/tokens';
import { TabBar } from '@/components/layout/TabBar';
import { QueryErrorBoundary } from '@/components/error/QueryErrorBoundary';

export default function TabsLayout() {
  return (
    <QueryErrorBoundary>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: colors.background },
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="journal" options={{ title: 'Journal' }} />
        <Tabs.Screen name="map" options={{ title: 'Map' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      </Tabs>
    </QueryErrorBoundary>
  );
}
