import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
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
    marginTop: 75, // Adjust for status bar height
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});