import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
}

interface SearchResultsProps {
  results: Pokemon[];
  onPokemonPress: (pokemon: Pokemon) => void; // Function to handle when a Pokemon is pressed
}

export default function SearchResults({ results, onPokemonPress }: SearchResultsProps) {
  return (
    <View style={styles.container}>
      {results.map((pokemon) => (
        <TouchableOpacity
          key={pokemon.id}
          style={styles.resultItem}
          onPress={() => onPokemonPress(pokemon)}
        >
          <Text style={styles.resultText}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  resultText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 8,
  },
  resultItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});