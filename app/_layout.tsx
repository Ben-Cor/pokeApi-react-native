import { Stack } from 'expo-router';
import { PokemonProvider } from '../src/context/PokemonContext';

export default function RootLayout() {
  return (
    <PokemonProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Search' }} />
        <Stack.Screen name="pokemon/[id]" options={{ title: 'Pokemon Details' }} />
        <Stack.Screen name="favourites" options={{ title: 'Favourites' }} />
      </Stack>
    </PokemonProvider>
  );
}