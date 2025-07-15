import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SearchResults({ results }: { results: any[] }) {
  return (
    // This component displays the search results for Pokemon
    // It receives an array of results as a prop
    // and maps through them to display each Pokemon's name
    <View style={styles.container}>
      {results.map((pokemon, index) => (
        <Text key={index} style={styles.resultText}>
          {pokemon.name}
        </Text>
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
});