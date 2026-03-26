import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radii } from '@/design-system/tokens';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';

interface Props {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Ionicons name="warning-outline" size={40} color={colors.accentRose} />
            </View>
            <Text variant="title3" align="center" style={styles.title}>
              Something went wrong
            </Text>
            <Text
              variant="subhead"
              color={colors.textSecondary}
              align="center"
              style={styles.subtitle}
            >
              An unexpected error occurred. Please try again.
            </Text>
            <Button
              title="Try Again"
              variant="secondary"
              size="md"
              onPress={this.handleReset}
            />
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing['2xl'],
  },
  card: {
    backgroundColor: colors.glassFill,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.glassStroke,
    padding: spacing['2xl'],
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accentRoseMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.sm,
  },
  subtitle: {
    marginBottom: spacing.xl,
  },
});
