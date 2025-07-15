import { StackNavigationProp } from '@react-navigation/stack';
import { Pokemon } from './pokemon'; 

export type RootStackParamList = {
  Search: undefined;
  PokeInfo: { pokemon: Pokemon };
  // Add other screens here
};

export type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;