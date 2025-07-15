import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRoute, RouteProp } from '@react-navigation/native';
import { Pokemon } from '../types/pokemon';
import { RootStackParamList } from '../types/navigation';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import Navbar from "../components/Navbar";

export default function PokeInfo() {
  const route = useRoute<RouteProp<RootStackParamList, 'PokeInfo'>>();
  const { pokemon } = route.params;

  const [favourite, setFavourite] = React.useState(false);

  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const toggleFavourite = () => {
    setFavourite(!favourite);
    // TODO Global state to be added here later
  };

  // Fallback for when fonts are not loaded
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
        <Text style={styles.title}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>

        <TouchableOpacity onPress={toggleFavourite}>
          <Text style={{ color: 'blue', marginBottom: 20 }}>
            {favourite ? 'Remove from Favourites' : 'Add to Favourites'}
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
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  title: {
    fontSize: 20, // Reduced size as pixel fonts appear larger
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
    backgroundColor: '#fff', // Added background color for better visibility
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
});