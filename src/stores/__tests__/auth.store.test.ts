import { useAuthStore } from '../auth.store';

describe('auth store', () => {
  beforeEach(() => {
    useAuthStore.getState().reset();
  });

  it('starts with null session and user', () => {
    const state = useAuthStore.getState();
    expect(state.session).toBeNull();
    expect(state.user).toBeNull();
  });

  it('sets session and derives user', () => {
    const mockSession = {
      access_token: 'token',
      refresh_token: 'refresh',
      user: { id: 'user-1', email: 'test@test.com' },
    } as any;

    useAuthStore.getState().setSession(mockSession);
    const state = useAuthStore.getState();
    expect(state.session).toBe(mockSession);
    expect(state.user).toEqual(mockSession.user);
    expect(state.isLoading).toBe(false);
  });

  it('clears user when session is null', () => {
    useAuthStore.getState().setSession({
      user: { id: 'user-1' },
    } as any);
    useAuthStore.getState().setSession(null);
    expect(useAuthStore.getState().user).toBeNull();
  });

  it('sets hydrated state', () => {
    useAuthStore.getState().setHydrated(true);
    expect(useAuthStore.getState().hasHydrated).toBe(true);
  });

  it('resets to initial state', () => {
    useAuthStore.getState().setSession({
      user: { id: 'user-1' },
    } as any);
    useAuthStore.getState().reset();
    const state = useAuthStore.getState();
    expect(state.session).toBeNull();
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
  });
});
