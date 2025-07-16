import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router, useSegments } from 'expo-router';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';

export default function Navbar() {
  const segments = useSegments();
  
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  // Determine which screen we're currently on
  const currentRoute = segments[0] || 'index';
  const isSearchScreen = currentRoute === 'index' || currentRoute === '';
  const isFavoritesScreen = currentRoute === 'favourites';

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
        <TouchableOpacity onPress={() => router.push('/favourites')}>
          <Text style={navbarStyle.title}>Favourites</Text>
        </TouchableOpacity>
      ) : isFavoritesScreen ? (
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={navbarStyle.title}>Search</Text>
        </TouchableOpacity>
      ) : (
        // Default case (for Pokemon details or other screens)
        <View style={navbarStyle.row}>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={navbarStyle.title}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/favourites')}>
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