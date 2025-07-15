import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Pokemon } from '../types/pokemon';

export default function PokeInfo() {
  const route = useRoute();
  const { pokemon } = route.params as { pokemon: Pokemon };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pokemon.name}</Text>
      <Text>Height: {pokemon.height}</Text>
      <Text>Weight: {pokemon.weight}</Text>
      {/* Add more Pokemon details here */}
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
});