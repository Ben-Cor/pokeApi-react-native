import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

// Define the props for the Searchbar component
interface SearchbarProps {
  onSearch: (searchTerm: string) => void; 
  placeholder?: string; //optional prop for placeholder text
}

export default function PokemonSearchbar({ onSearch, placeholder = "Search Pokemon..." }: SearchbarProps) {

  // State to hold the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search when the user submits the input
  // or presses the search button
  // It trims the input to avoid unnecessary spaces
  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <View style={searchbarStyle.container}>
      <TextInput
        style={searchbarStyle.input}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder={placeholder}
        placeholderTextColor="#666"
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity 
        style={searchbarStyle.button} 
        onPress={handleSearch}
        activeOpacity={0.8}
      >
        <Text style={searchbarStyle.buttonText}>🔍</Text>
      </TouchableOpacity>
    </View>
  );
}

const searchbarStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
});
