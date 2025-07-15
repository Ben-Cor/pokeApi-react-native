import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Navbar() {
  return (
    <View style={navbarStyle.container}>
      <Text style={navbarStyle.title}>Navbar</Text>
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
    marginTop: 25, // Adjust for status bar height
  },
  title: {
    fontSize: 20,
    fontFamily: 'PressStart2P_400Regular',
    color: '#333',
    textAlign: 'center',
  },
});