import React, { useEffect, useState } from "react";

// Define the structure of the Pokemon data
interface Pokemon {
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

export default function usePokemonInfo() {
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async (name: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) throw new Error('Pokemon not found');
      
      const data = await response.json();
      setPokemonData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setPokemonData(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    pokemonData,
    loading,
    error,
    getPokemonData: getData
  };
}