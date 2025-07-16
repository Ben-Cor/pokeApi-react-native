import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router } from 'expo-router';
import Navbar from "../src/components/Navbar";
import { usePokemon } from '../src/context/PokemonContext';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import SearchResults from "../src/components/SearchResults";
import { Pokemon } from '../src/types/pokemon';
import Header from "../src/components/Header";

export default function Favourites() {
  const { favorites } = usePokemon();
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  useEffect(() => {
    const fetchFavoritePokemons = async () => {
      if (favorites.length === 0) {
        setFavoritePokemon([]);
        setLoading(false);
        return;
      }

      try {
        const pokemonPromises = favorites.map(async (name) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          if (response.ok) {
            return await response.json();
          }
          return null;
        });

        const pokemonData = await Promise.all(pokemonPromises);
        const validPokemon = pokemonData.filter(p => p !== null) as Pokemon[];
        setFavoritePokemon(validPokemon);
      } catch (error) {
        console.error('Error fetching favorite Pokemon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritePokemons();
  }, [favorites]);

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