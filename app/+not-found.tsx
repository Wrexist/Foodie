import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { colors, spacing } from '@/design-system/tokens';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View style={styles.container}>
        <Text variant="title1">Page not found</Text>
        <Link href="/" style={styles.link}>
          <Text variant="body" color={colors.accentGold}>
            Go back home
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    gap: spacing.lg,
  },
  link: {
    marginTop: spacing.lg,
  },
});
