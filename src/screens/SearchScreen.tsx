// src/screens/SearchScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import PokemonSearchbar from '../components/Searchbar';
import Header from '../components/Header';
import usePokemonInfo from '../hooks/pokemonInfo';
import { Pokemon } from '../types/pokemon';
import SearchResults from '../components/SearchResults';
import { SearchScreenNavigationProp } from '../types/navigation';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/Navbar';

export default function SearchScreen() {
  // This will hold our Pokemon data after searching
  const [searchedPokemon, setSearchedPokemon] = useState<Pokemon[]>([]);
  
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

  const navigation = useNavigation<SearchScreenNavigationProp>();

  const handlePokemonPress = (pokemon: Pokemon) => {
    navigation.navigate('PokeInfo', { pokemon });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
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
        
        {/* Show Pokemon results if we found any */}
        {pokemonData.length > 0 && !loading && !error && (
          <SearchResults results={pokemonData} onPokemonPress={handlePokemonPress} />
        )}
        
        {/* Show welcome message when nothing is happening */}
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