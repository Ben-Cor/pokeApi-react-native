import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

interface SearchbarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

export function PokemonSearchbar({ onSearch, placeholder = "Search Pokemon..." }: SearchbarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <View style={pokemonStyles.container}>
      <TextInput
        style={pokemonStyles.input}
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
        style={pokemonStyles.button} 
        onPress={handleSearch}
        activeOpacity={0.8}
      >
        <Text style={pokemonStyles.buttonText}>🔍</Text>
      </TouchableOpacity>
    </View>
  );
}

const pokemonStyles = StyleSheet.create({
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
