import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the context type
interface PokemonContextType {
  favorites: string[];
  addFavorite: (name: string) => Promise<void>;
  removeFavorite: (name: string) => Promise<void>;
  isFavorite: (name: string) => boolean;
}

// Create the context
const PokemonContext = createContext<PokemonContextType>({
  favorites: [],
  addFavorite: async (name: string) => {},
  removeFavorite: async (name: string) => {},
  isFavorite: (name: string) => false,
});


// Storage key for AsyncStorage
const FAVORITES_KEY = 'pokemon_favorites';

// Provider component
// this will wrap around my app.tsx file
// and provide the context to all components
export const PokemonProvider = ({ children }: { children: ReactNode }): React.ReactElement => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from AsyncStorage on app start
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (newFavorites: string[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const addFavorite = async (name: string) => {
    const newFavorites = [...favorites, name.toLowerCase()];
    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  const removeFavorite = async (name: string) => {
    const newFavorites = favorites.filter(fav => fav !== name.toLowerCase());
    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  const isFavorite = (name: string) => {
    return favorites.includes(name.toLowerCase());
  };

  return (
    <PokemonContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

// Custom hook to use the context
export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};