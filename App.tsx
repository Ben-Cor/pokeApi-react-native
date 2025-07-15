import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './src/screens/SearchScreen';
import PokeInfo from './src/screens/PokeInfo';
import { RootStackParamList } from './src/types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}