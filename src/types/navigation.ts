import { StackNavigationProp } from '@react-navigation/stack';
import { Pokemon } from './pokemon'; 

export type RootStackParamList = {
  Search: undefined;
  PokeInfo: { pokemon: Pokemon };
  Favourites: undefined;
};

export type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;