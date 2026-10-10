
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type UserProfile = {
  name: string;
  email: string;
  age: string;
  goal: string;
};

const DEFAULT_PROFILE: UserProfile = {
  name: 'SportTrack User',
  email: '',
  age: '',
  goal: 'Stay active',
};

type ProfileContextType = {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isLoaded: boolean;
};

const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const saved = await AsyncStorage.getItem('sporttrack_profile');

        if (saved && active) {
          setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(saved) });
        }
      } catch (error) {
        console.error('Could not load profile:', error);
      } finally {
        if (active) setIsLoaded(true);
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    AsyncStorage.setItem(
      'sporttrack_profile',
      JSON.stringify(profile)
    ).catch((error) => {
      console.error('Could not save profile:', error);
    });
  }, [profile, isLoaded]);

  function updateProfile(updates: Partial<UserProfile>) {
    setProfile((current) => ({ ...current, ...updates }));
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, isLoaded }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used inside ProfileProvider');
  }

  return context;
}
