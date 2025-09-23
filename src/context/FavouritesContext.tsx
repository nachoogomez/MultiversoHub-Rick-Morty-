import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character } from '../types/character';
import telemetryService from '../services/telemetryService';

interface FavouritesContextType {
  favourites: Character[];
  addToFavourites: (character: Character) => void;
  removeFromFavourites: (characterId: number) => void;
  isFavourite: (characterId: number) => boolean;
  toggleFavourite: (character: Character) => void;
  clearFavourites: () => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

const STORAGE_KEY = '@multiverso_hub_favourites';

interface FavouritesProviderProps {
  children: ReactNode;
}

export function FavouritesProvider({ children }: FavouritesProviderProps) {
  const [favourites, setFavourites] = useState<Character[]>([]);

  // Load favourites from storage on mount
  useEffect(() => {
    loadFavourites();
  }, []);

  const loadFavourites = async () => {
    try {
      const storedFavourites = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedFavourites) {
        setFavourites(JSON.parse(storedFavourites));
      }
    } catch (error) {
      console.error('Error loading favourites:', error);
    }
  };

  const saveFavourites = async (newFavourites: Character[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFavourites));
    } catch (error) {
      console.error('Error saving favourites:', error);
    }
  };

  const addToFavourites = (character: Character) => {
    const isAlreadyFavourite = favourites.some(fav => fav.id === character.id);
    if (!isAlreadyFavourite) {
      const newFavourites = [...favourites, character];
      setFavourites(newFavourites);
      saveFavourites(newFavourites);
      telemetryService.trackFavoritesAdd(character.id, character.name);
    }
  };

  const removeFromFavourites = (characterId: number) => {
    const character = favourites.find(fav => fav.id === characterId);
    const newFavourites = favourites.filter(fav => fav.id !== characterId);
    setFavourites(newFavourites);
    saveFavourites(newFavourites);
    if (character) {
      telemetryService.trackFavoritesRemove(characterId, character.name);
    }
  };

  const isFavourite = (characterId: number): boolean => {
    return favourites.some(fav => fav.id === characterId);
  };

  const toggleFavourite = (character: Character) => {
    if (isFavourite(character.id)) {
      removeFromFavourites(character.id);
    } else {
      addToFavourites(character);
    }
  };

  const clearFavourites = () => {
    const totalFavorites = favourites.length;
    setFavourites([]);
    saveFavourites([]);
    telemetryService.trackFavoritesReset(totalFavorites);
  };

  const value: FavouritesContextType = {
    favourites,
    addToFavourites,
    removeFromFavourites,
    isFavourite,
    toggleFavourite,
    clearFavourites,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
}
