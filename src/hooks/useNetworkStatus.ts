import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useUIStore } from '@/stores/ui.store';

export function useNetworkStatus() {
  const setOnline = useUIStore((s) => s.setOnline);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setOnline(state.isConnected ?? true);
    });
    return () => unsubscribe();
  }, [setOnline]);

  return useUIStore((s) => s.isOnline);
}
