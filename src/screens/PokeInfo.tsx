import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRoute, RouteProp } from '@react-navigation/native';
import { Pokemon } from '../types/pokemon';
import { RootStackParamList } from '../types/navigation';

export default function PokeInfo() {
  const route = useRoute<RouteProp<RootStackParamList, 'PokeInfo'>>();
  const { pokemon } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>
      
      <Image 
        source={{ uri: pokemon.sprites.front_default }} 
        style={styles.sprite}
      />
      
      <View style={styles.detailRow}>
        <Text>Height: {pokemon.height / 10}m</Text>
        <Text>Weight: {pokemon.weight / 10}kg</Text>
      </View>
      
      <Text>Species: {pokemon.species.name}</Text>
      
      <Text style={styles.sectionTitle}>Base Stats:</Text>
      {pokemon.stats.map((stat) => (
        <Text key={stat.stat.name}>
          {stat.stat.name}: {stat.base_stat}
        </Text>
      ))}
      
      <Text style={styles.sectionTitle}>
        Appeared in {pokemon.game_indices.length} games
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  sprite: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
});