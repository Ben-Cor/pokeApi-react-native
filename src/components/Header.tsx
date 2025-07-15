import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';

export default function Header() {
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={headerStyle.container}>
        <Text style={headerStyle.title}>Pokemon App</Text>
      </View>
    );
  }

  // Re - render the header once fonts are loaded
  return (
    <View style={headerStyle.container}>
      <Text style={headerStyle.title}>Pokemon App</Text>
    </View>
  );
}

const headerStyle = StyleSheet.create({
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
    marginTop: 25, // Adjust for status bar height
  },
  title: {
    fontSize: 20,
    fontFamily: 'PressStart2P_400Regular',
    color: '#333',
    textAlign: 'center',
  },
});