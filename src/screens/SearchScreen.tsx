// src/screens/SearchScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import PokemonSearchbar from '../components/Searchbar';
import Header from '../components/Header';
import usePokemonInfo from '../hooks/pokemonInfo';

//duplicate of pokemon interface
//TODO check if this can be imported rather than duplicated code
interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  game_indices: Array<any>;
  species: { name: string };
}

export default function SearchScreen() {
  // This will hold our Pokemon data after searching
  const [searchedPokemon, setSearchedPokemon] = useState<Pokemon | null>(null);
  
  // Get functions from your hook
  const { pokemonData, loading, error, getPokemonData } = usePokemonInfo();

  // This function runs when user searches
  const handleSearch = (searchTerm: string) => {
    console.log('Searching for:', searchTerm);
    getPokemonData(searchTerm);
  };

  // When pokemonData changes, update our searched pokemon
  React.useEffect(() => {
    if (pokemonData) {
      setSearchedPokemon(pokemonData);
    }
  }, [pokemonData]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      {/* Your search bar */}
      <PokemonSearchbar onSearch={handleSearch} />
      
      {/* Show different things based on what's happening */}
      <View style={styles.content}>
        
        {/* Show loading message */}
        {loading && (
          <Text style={styles.message}>Looking for Pokemon...</Text>
        )}
        
        {/* Show error message */}
        {error && (
          <Text style={styles.errorMessage}>
            Pokemon not found! Try "pikachu" or "charizard"
          </Text>
        )}
        
        {/* Show Pokemon info if we found one */}
        {searchedPokemon && !loading && !error && (
          <View style={styles.pokemonCard}>
            <Text style={styles.pokemonName}>
              {searchedPokemon.name.toUpperCase()}
            </Text>
            <Text>Height: {searchedPokemon.height}</Text>
            <Text>Weight: {searchedPokemon.weight}</Text>
            <Text>ID: {searchedPokemon.id}</Text>
          </View>
        )}
        
        {/* Show welcome message when nothing is happening */}
        {!loading && !error && !searchedPokemon && (
          <Text style={styles.message}>
            Welcome! Search for a Pokemon above.
          </Text>
        )}
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  pokemonCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});