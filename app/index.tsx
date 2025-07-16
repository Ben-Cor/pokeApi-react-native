import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import PokemonSearchbar from '../src/components/Searchbar';
import Header from '../src/components/Header';
import usePokemonInfo from '../src/hooks/pokemonInfo';
import { Pokemon } from '../src/types/pokemon';
import SearchResults from '../src/components/SearchResults';
import Navbar from '../src/components/Navbar';

export default function SearchScreen() {
  const [searchedPokemon, setSearchedPokemon] = useState<Pokemon[]>([]);
  const { pokemonData, loading, error, getPokemonData } = usePokemonInfo();

  const handleSearch = (searchTerm: string) => {
    console.log('Searching for:', searchTerm);
    getPokemonData(searchTerm);
  };

  React.useEffect(() => {
    if (pokemonData) {
      setSearchedPokemon(pokemonData);
    }
  }, [pokemonData]);

  const handlePokemonPress = (pokemon: Pokemon) => {
    // Navigate to pokemon details with the pokemon data as params
    router.push({
      pathname: '/pokemon/[id]',
      params: { 
        id: pokemon.id.toString(),
        pokemonData: JSON.stringify(pokemon)
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header content='PokeApp - Search' />
      <Navbar />
      <PokemonSearchbar onSearch={handleSearch} />
      
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {loading && (
          <Text style={styles.message}>Looking for Pokemon...</Text>
        )}
        
        {error && (
          <Text style={styles.errorMessage}>
            Pokemon not found! Try "pikachu" or "charizard"
          </Text>
        )}
        
        {pokemonData.length > 0 && !loading && !error && (
          <SearchResults results={pokemonData} onPokemonPress={handlePokemonPress} />
        )}
        
        {!loading && !error && pokemonData.length === 0 && (
          <Text style={styles.message}>
            Welcome! Search for a Pokemon above.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d63030ff',
    color: '#fff',
    paddingTop: 50,
  },
  scrollContainer: {
    flex: 1,
    borderRadius: 10,
  },
  scrollContent: {
    margin: 20,
    minHeight: '100%',
    borderRadius: 10,
  },
  message: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
  errorMessage: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
});