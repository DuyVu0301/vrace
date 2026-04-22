import { create } from "zustand";

interface User {
  id: string;
  name: string;
  strava_id?: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  connectStrava: (stravaId: string) => void;
  disconnectStrava: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  connectStrava: (stravaId) =>
    set((state) => ({
      user: state.user ? { ...state.user, strava_id: stravaId } : null,
    })),
  disconnectStrava: () =>
    set((state) => ({
      user: state.user ? { ...state.user, strava_id: undefined } : null,
    })),
}));
