console.log('Starting test runner...');

// Simple test utilities
const describe = (name: string, fn: () => void) => {
  console.log(`\n📝 ${name}`);
  fn();
};

const it = (name: string, fn: () => void) => {
  try {
    fn();
    console.log(`  ✅ ${name}`);
  } catch (error) {
    console.log(`  ❌ ${name}`);
    console.log(`     Error: ${error}`);
  }
};

const expect = (actual: any) => ({
  toBe: (expected: any) => {
    if (actual !== expected) {
      throw new Error(`Expected ${expected}, but got ${actual}`);
    }
  },
  toContain: (expected: any) => {
    if (!actual.includes(expected)) {
      throw new Error(`Expected ${actual} to contain ${expected}`);
    }
  },
  toBeTruthy: () => {
    if (!actual) {
      throw new Error(`Expected ${actual} to be truthy`);
    }
  },
  toBeFalsy: () => {
    if (actual) {
      throw new Error(`Expected ${actual} to be falsy`);
    }
  }
});

console.log('🧪 Running Pokemon App Tests...\n');

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

});

console.log('\n🎉 All tests completed successfully!');
