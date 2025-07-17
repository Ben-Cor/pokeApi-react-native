import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router } from 'expo-router';
import Navbar from "../src/components/Navbar";
import { usePokemon } from '../src/context/PokemonContext';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import SearchResults from "../src/components/SearchResults";
import { Pokemon } from '../src/types/pokemon';
import Header from "../src/components/Header";
import usePokemonInfo from '../src/hooks/pokemonInfo';

export default function Favourites() {
  const { favorites } = usePokemon();
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon[]>([]);
  const { pokemonData, loading, error, getPokemonData } = usePokemonInfo();
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  useEffect(() => {
    const fetchFavoritePokemons = async () => {
      if (favorites.length === 0) {
        setFavoritePokemon([]);
        // setLoading(false);
        return;
      }

  // Fetch all Pokemon that match favorites
      const favoritePromises = favorites.map(name => getPokemonData(name));
      
      try {
        await Promise.all(favoritePromises);
        // Filter the results to only include favorites
        const favoriteResults = pokemonData.filter(pokemon => 
          favorites.some(fav => fav.toLowerCase() === pokemon.name.toLowerCase())
        );
        setFavoritePokemon(favoriteResults);
      } catch (error) {
        console.error('Error fetching favorite Pokemon:', error);
      }
    };

    fetchFavoritePokemons();
  }, [favorites]);

  // Update when pokemonData changes
  useEffect(() => {
    if (pokemonData.length > 0) {
      const favoriteResults = pokemonData.filter(pokemon => 
        favorites.some(fav => fav.toLowerCase() === pokemon.name.toLowerCase())
      );
      setFavoritePokemon(favoriteResults);
    }
  }, [pokemonData, favorites]);

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  const handlePokemonPress = (pokemon: Pokemon) => {
    router.push({
      pathname: '/pokemon/[id]',
      params: { 
        id: pokemon.id.toString(),
        pokemonData: JSON.stringify(pokemon)
      }
    });
  };

  return (
    <View style={styles.screenContainer}>
      <Header content='PokeApp - Favourites' />
      <Navbar />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {favoritePokemon.length > 0 ? (
          <SearchResults results={favoritePokemon} onPokemonPress={handlePokemonPress} />
        ) : (
          <Text style={styles.noFavouritesText}>No favourites added yet.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#d63030ff",
    paddingTop: 50,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#d63030ff",
    paddingTop: 50,
  },
  scrollView: {
    flex: 1,
    paddingTop: 20,
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 16,
    color: "#fff",
    fontFamily: 'PressStart2P_400Regular',
    paddingBottom: 20,
    marginTop: 20,
  },
  noFavouritesText: {
    fontSize: 16,
    color: "#888",
    marginTop: 20,
    textAlign: "center",
  },
});