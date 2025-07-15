import React, { useEffect, useState } from "react";
import { Pokemon } from "../types/pokemon";

export default function usePokemonInfo() {
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null); // Initialize as null to handle cases where no data is fetched
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); //either string or null

    // Function to fetch Pokemon data by name
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