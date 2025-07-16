import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";
import { usePokemon } from '../context/PokemonContext';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import SearchResults from "../components/SearchResults";
import { SearchScreenNavigationProp } from '../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { Pokemon } from '../types/pokemon';

export default function Favourites() {
  const { favorites } = usePokemon();
  const [favoritePokemon, setFavoritePokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  // Fetch full Pokemon data for favorites
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

  const navigation = useNavigation<SearchScreenNavigationProp>();

  const handlePokemonPress = (pokemon: Pokemon) => {
    navigation.navigate('PokeInfo', { pokemon });
  };

  return (
    <View style={styles.screenContainer}>
        <Navbar />
        <View style={styles.container}>
            <Text style={styles.title}>Favourites Screen</Text>
            {favoritePokemon.length > 0 ? (
              <SearchResults results={favoritePokemon} onPokemonPress={handlePokemonPress} />
            ) : (
              <Text style={styles.noFavouritesText}>No favourites added yet.</Text>
            )}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 16,
    color: "#333",
    fontFamily: 'PressStart2P_400Regular',
    paddingBottom: 20,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 60,
  },
  favouriteText: {
    fontSize: 12,
    color: "#555",
    marginVertical: 5,
    fontFamily: 'PressStart2P_400Regular',
  },
  noFavouritesText: {
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});