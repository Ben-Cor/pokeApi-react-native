import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PokemonSearchbar } from './src/components/Searchbar';

export default function App() {
  const handleSearch = (searchTerm: string) => {
    console.log('Searching for:', searchTerm);
    // Add your search logic here
  };

  return (
    <View style={styles.container}>
      <PokemonSearchbar onSearch={handleSearch} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});