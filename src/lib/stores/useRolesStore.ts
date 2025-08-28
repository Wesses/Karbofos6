import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RolesState {
  roles: string[];
  hydrated: boolean;
  setRoles: (roles: string[]) => void;
}

export const useRolesStore = create<RolesState>()(
  persist(
    (set) => ({
      roles: [],
      hydrated: false,
      setRoles: (roles) => set({ roles }),
    }),
    {
      name: 'roles-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          setTimeout(() => {
            state.hydrated = true;
          });
        }
      },
    }
  )
);
