import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";
import { usePokemon } from '../context/PokemonContext';

export default function Favourites() {

  const { favorites } = usePokemon();

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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 60,
  },
  favouriteText: {
    fontSize: 18,
    color: "#555",
    marginVertical: 5,
  },
  noFavouritesText: {
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});