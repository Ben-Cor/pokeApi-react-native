import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Favourites() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourites Screen</Text>
      <Text>List of favourite Pokémon will be displayed here.</Text>
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