import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Pokemon } from "../types/pokemon";

interface SearchResultsProps {
  results: Pokemon[] | null;
  onPokemonPress: (pokemon: Pokemon) => void; // Function to handle when a Pokemon is pressed
}

export default function SearchResults({ results, onPokemonPress }: SearchResultsProps) {
  if (!results || results.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noResultsText}>No results found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {results.map((pokemon) => (
        <TouchableOpacity
          key={pokemon.id}
          style={styles.resultItem}
          onPress={() => onPokemonPress(pokemon)}
          // hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Text style={styles.resultText}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Text>
          <Image 
                  source={{ uri: pokemon.sprites.front_default }} 
                  style={styles.sprite}
                />
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
    alignContent: 'center',
    textAlign: 'center',
  },
  resultText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 8,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
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
  sprite: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 10,
  },
});