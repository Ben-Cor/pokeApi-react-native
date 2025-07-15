import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../types/navigation";
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { StackNavigationProp } from '@react-navigation/stack';

export default function Navbar() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  // Determine which screen we're currently on
  const isSearchScreen = route.name === "Search";
  const isFavoritesScreen = route.name === "Favourites";

  // Simple fallback while fonts load
  if (!fontsLoaded) {
    return (
      <View style={navbarStyle.container}>
        <Text style={navbarStyle.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={navbarStyle.container}>
      {isSearchScreen ? (
        <TouchableOpacity onPress={() => navigation.navigate("Favourites")}>
          <Text style={navbarStyle.title}>Favourites</Text>
        </TouchableOpacity>
      ) : isFavoritesScreen ? (
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Text style={navbarStyle.title}>Search</Text>
        </TouchableOpacity>
      ) : (
        // Default case (for PokeInfo or other screens)
        <View style={navbarStyle.row}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Text style={navbarStyle.title}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Favourites")}>
            <Text style={navbarStyle.title}>Favourites</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const navbarStyle = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 12,
    fontFamily: 'PressStart2P_400Regular',
    color: '#d63030ff',
    textAlign: 'center',
  },
});