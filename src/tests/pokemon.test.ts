import { describe, it, expect } from '../utils/testUtils';

// Test utility functions (pure functions that don't need React)
describe('Pokemon Utilities', () => {
  
  it('should format pokemon name correctly', () => {
    const formatPokemonName = (name: string) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    };
    
    expect(formatPokemonName('pikachu')).toBe('Pikachu');
    expect(formatPokemonName('CHARIZARD')).toBe('CHARIZARD');
    expect(formatPokemonName('bulbasaur')).toBe('Bulbasaur');
  });

  it('should check if pokemon name is valid', () => {
    const isValidPokemonName = (name: string) => {
      return name.length > 0 && name.length <= 20;
    };
    
    expect(isValidPokemonName('pikachu')).toBeTruthy();
    expect(isValidPokemonName('')).toBeFalsy();
    expect(isValidPokemonName('a'.repeat(21))).toBeFalsy();
  });

  it('should filter pokemon by type', () => {
    const mockPokemon = [
      { name: 'pikachu', types: ['electric'] },
      { name: 'charizard', types: ['fire', 'flying'] },
      { name: 'bulbasaur', types: ['grass', 'poison'] }
    ];
    
    const filterByType = (pokemon: any[], type: string) => {
      return pokemon.filter(p => p.types.includes(type));
    };
    
    const fireTypes = filterByType(mockPokemon, 'fire');
    expect(fireTypes.length).toBe(1);
    expect(fireTypes[0].name).toBe('charizard');
  });

});

// Test API-related functions
describe('Pokemon API Functions', () => {
  
  it('should build correct API URL', () => {
    const buildPokemonUrl = (name: string) => {
      return `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    };
    
    expect(buildPokemonUrl('Pikachu')).toBe('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(buildPokemonUrl('CHARIZARD')).toBe('https://pokeapi.co/api/v2/pokemon/charizard');
  });

  it('should handle pokemon weight conversion', () => {
    const convertWeight = (weight: number) => {
      return weight / 10; // Convert from hectograms to kg
    };
    
    expect(convertWeight(60)).toBe(6);
    expect(convertWeight(850)).toBe(85);
  });

  it('should handle pokemon height conversion', () => {
    const convertHeight = (height: number) => {
      return height / 10; // Convert from decimeters to meters
    };
    
    expect(convertHeight(4)).toBe(0.4);
    expect(convertHeight(17)).toBe(1.7);
  });

});

// Test favorites functionality
describe('Favorites Logic', () => {
  
  it('should add pokemon to favorites', () => {
    const favorites: string[] = [];
    
    const addToFavorites = (name: string, currentFavorites: string[]) => {
      if (!currentFavorites.includes(name.toLowerCase())) {
        return [...currentFavorites, name.toLowerCase()];
      }
      return currentFavorites;
    };
    
    const newFavorites = addToFavorites('Pikachu', favorites);
    expect(newFavorites).toContain('pikachu');
    expect(newFavorites.length).toBe(1);
  });

  it('should remove pokemon from favorites', () => {
    const favorites = ['pikachu', 'charizard'];
    
    const removeFromFavorites = (name: string, currentFavorites: string[]) => {
      return currentFavorites.filter(fav => fav !== name.toLowerCase());
    };
    
    const newFavorites = removeFromFavorites('Pikachu', favorites);
    expect(newFavorites.length).toBe(1);
    expect(newFavorites).toContain('charizard');
  });

  it('should check if pokemon is favorite', () => {
    const favorites = ['pikachu', 'charizard'];
    
    const isFavorite = (name: string, currentFavorites: string[]) => {
      return currentFavorites.includes(name.toLowerCase());
    };
    
    expect(isFavorite('Pikachu', favorites)).toBeTruthy();
    expect(isFavorite('Bulbasaur', favorites)).toBeFalsy();
  });

});

// Run all tests
console.log('🧪 Running Pokemon App Tests...');
// The tests will run when this file is imported/executed
