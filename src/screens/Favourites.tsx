import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";
import { usePokemon } from '../context/PokemonContext';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';

export default function Favourites() {

  const { favorites } = usePokemon();
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
        <Navbar />
        <View style={styles.container}>
            <Text style={styles.title}>Favourites Screen</Text>
            {favorites.length > 0 ? (
              favorites.map((pokemonName, index) => (
                <Text key={index} style={styles.favouriteText}>
                  {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
                </Text>
              ))
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