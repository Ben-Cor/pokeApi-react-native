// Pokemon interface for type safety across the app
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  game_indices: Array<any>;
  species: { name: string };
}