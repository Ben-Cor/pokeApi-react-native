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
      <View style={styles.grid}>
        {results.map((pokemon) => (
          <TouchableOpacity
            key={pokemon.id}
            style={styles.gridItem}
            onPress={() => onPokemonPress(pokemon)}
          >
            <Image 
              source={{ uri: pokemon.sprites.front_default }} 
              style={styles.sprite}
            />
            <Text style={styles.resultText}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden', // This ensures child elements don't overflow the rounded corners
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10, // Add gap between it
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  gridItem: {
    width: '31%', // Roughly 1/3 of the width with some margin
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    borderColor: '#d63030ff',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sprite: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  resultText: {
    fontSize: 8,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'PressStart2P_400Regular',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});