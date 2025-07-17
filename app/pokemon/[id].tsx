import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { Pokemon } from '../../src/types/pokemon';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import Navbar from "../../src/components/Navbar";
import { usePokemon } from '../../src/context/PokemonContext';
import Header from "../../src/components/Header";
import usePokemonInfo from "../../src/hooks/pokemonInfo";

export default function PokemonDetails() {
  const { isFavorite, addFavorite, removeFavorite } = usePokemon();
  const { id } = useLocalSearchParams<{ id: string }>();
  
 // Use our hook to fetch the single Pokemon
  const { pokemonData, loading, error, getSinglePokemon } = usePokemonInfo();

  useEffect(() => {
    if (id) {
      getSinglePokemon(id);
    }
  }, [id]);

  // The single pokemon will be the first item in the array
  const pokemon = pokemonData?.[0];

  const toggleFavourite = async () => {
    if (pokemon && isFavorite(pokemon.name)) {
      await removeFavorite(pokemon.name);
    } else if (pokemon) {
      await addFavorite(pokemon.name);
    }
  };

  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  if (!fontsLoaded || !pokemon) {
    return (
      <View style={styles.screenContainer}>
        <Header content="PokeApp" />
        <Navbar />
        <View style={styles.container}>
          <Text style={styles.title}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <Header content={`PokeApp - ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`} />
      <Navbar />
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleFavourite}>
          <Text style={isFavorite(pokemon.name) ? styles.favoutite : styles.notFavourite}>
            {isFavorite(pokemon.name) ? 'Remove from Favourites' : 'Add to Favourites'}
          </Text>
        </TouchableOpacity>
        
        <Image 
          source={{ uri: pokemon.sprites.front_default }} 
          style={styles.sprite}
        />
        
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>Weight: {pokemon.weight / 10}kg</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailText}>Height: {pokemon.height / 10}m</Text>
        </View>
        
        <Text style={styles.detailText}>Species: {pokemon.species.name}</Text>
        
        <Text style={styles.sectionTitle}>Base Stats:</Text>
        {pokemon.stats.map((stat) => (
          <Text style={styles.textBody} key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </Text>
        ))}
        
        <Text style={styles.sectionTitle}>
          Appeared in {pokemon.game_indices.length} games
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 60,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: 'PressStart2P_400Regular',
  },
  sprite: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 40,
    borderColor: "#d63030ff",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#fff',
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
    fontFamily: 'PressStart2P_400Regular',
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 15,
    marginBottom: 5,
    fontFamily: 'PressStart2P_400Regular',
  },
  textBody: {
    fontSize: 12,
    color: "#333",
    marginBottom: 5,
    fontFamily: 'PressStart2P_400Regular',
  },
  favoutite: {
    fontSize: 10,
    color: "#d888",
    marginBottom: 20,
    fontFamily: 'PressStart2P_400Regular',
  },
  notFavourite: {
    fontSize: 14,
    color: "#d63030ff",
    marginBottom: 20,
    fontFamily: 'PressStart2P_400Regular',
  },
});