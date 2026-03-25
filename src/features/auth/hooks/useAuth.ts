import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { authService } from '../services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import type { SignInCredentials, SignUpCredentials, ProfileSetup } from '../types';

export function useSignIn() {
  return useMutation({
    mutationFn: (credentials: SignInCredentials) =>
      authService.signInWithEmail(credentials),
    onSuccess: () => {
      router.replace('/(tabs)');
    },
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: (credentials: SignUpCredentials) =>
      authService.signUpWithEmail(credentials),
    onSuccess: () => {
      router.replace('/(auth)/create-profile');
    },
  });
}

export function useSignOut() {
  const reset = useAuthStore((s) => s.reset);

  return useMutation({
    mutationFn: () => authService.signOut(),
    onSuccess: () => {
      reset();
      router.replace('/(auth)/sign-in');
    },
  });
}

export function useSetupProfile() {
  const user = useAuthStore((s) => s.user);

  return useMutation({
    mutationFn: (profile: ProfileSetup) => {
      if (!user) throw new Error('No user found');
      return authService.setupProfile(user.id, profile);
    },
    onSuccess: () => {
      router.replace('/(tabs)');
    },
  });
}
