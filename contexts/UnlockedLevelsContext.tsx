import React, { createContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'unlockedLevels';

interface UnlockedLevelsContextProps {
  unlockedLevels: number[];
  unlockLevel: (level: number) => void;
  isLoading: boolean;
}

export const UnlockedLevelsContext = createContext<UnlockedLevelsContextProps>({
  unlockedLevels: [1],
  unlockLevel: () => {},
  isLoading: true,
});

export function UnlockedLevelsProvider({ children }: { children: ReactNode }) {
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1]);
  const [isLoading, setIsLoading] = useState(true);

  // Load unlocked levels from AsyncStorage on startup
  useEffect(() => {
    const loadUnlockedLevels = async () => {
      try {
        const storedLevels = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedLevels) {
          setUnlockedLevels(JSON.parse(storedLevels));
        }
      } catch (error) {
        console.error('Failed to load unlocked levels:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUnlockedLevels();
  }, []);

  // Save unlocked levels to AsyncStorage when they change
  const unlockLevel = async (level: number) => {
    try {
      if (!unlockedLevels.includes(level)) {
        const newUnlockedLevels = [...unlockedLevels, level];
        setUnlockedLevels(newUnlockedLevels);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUnlockedLevels));
      }
    } catch (error) {
      console.error('Failed to save unlocked levels:', error);
    }
  };

  return (
    <UnlockedLevelsContext.Provider value={{ unlockedLevels, unlockLevel, isLoading }}>
      {children}
    </UnlockedLevelsContext.Provider>
  );
}