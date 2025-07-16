import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './src/screens/SearchScreen';
import PokeInfo from './src/screens/PokeInfo';
import Favourites from './src/screens/Favourites';
import { RootStackParamList } from './src/types/navigation';
import { PokemonProvider } from './src/context/PokemonContext';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PokemonProvider >
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="Search"
        screenOptions={{
        headerShown: false // This hides all headers
            }}>
          <Stack.Screen 
            name="Search" 
            component={SearchScreen} 
            options={{ title: 'Pokemon Search' }}
          />
          <Stack.Screen 
            name="PokeInfo" 
            component={PokeInfo} 
            options={{ title: 'Pokemon Details' }}
          />
          <Stack.Screen 
            name="Favourites" 
            component={Favourites} 
            options={{ title: 'Favourites' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PokemonProvider>
  );
}