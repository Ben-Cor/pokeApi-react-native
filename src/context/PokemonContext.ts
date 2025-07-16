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
