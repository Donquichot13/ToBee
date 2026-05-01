import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile, Pilier } from '../types'

interface ProfileState {
  profile: UserProfile
  wizardStep: number
  setProfile: (updates: Partial<UserProfile>) => void
  setWizardStep: (step: number) => void
  toggleObjectif: (pilier: Pilier) => void
  reset: () => void
}

const defaultProfile: UserProfile = {
  age: 35,
  situation: 'marie',
  enfants: [],
  revenus: 3000,
  profession: 'salarie',
  patrimoine: { epargne: 10000, immobilier: 0, valeursMob: 0, retraite: 0 },
  objectifs: [],
  ageDepart: 67,
  tmi: 30,
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      wizardStep: 1,
      setProfile: (updates) =>
        set((state) => ({ profile: { ...state.profile, ...updates } })),
      setWizardStep: (step) => set({ wizardStep: step }),
      toggleObjectif: (pilier) =>
        set((state) => {
          const has = state.profile.objectifs.includes(pilier)
          return {
            profile: {
              ...state.profile,
              objectifs: has
                ? state.profile.objectifs.filter((o) => o !== pilier)
                : [...state.profile.objectifs, pilier],
            },
          }
        }),
      reset: () => set({ profile: defaultProfile, wizardStep: 1 }),
    }),
    { name: 'tobee-profile' }
  )
)
