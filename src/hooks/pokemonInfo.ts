import React, { useEffect, useState } from "react";
import { Pokemon } from "../types/pokemon";


export default function usePokemonInfo() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]); // Initialize as empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); //either string or null

    // Function to fetch Pokemon data by name
  const getData = async (name: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // First, fetch the list of all Pokemon to search through
      const listResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      if (!listResponse.ok) throw new Error('Failed to fetch Pokemon list');
      
      const listData = await listResponse.json();

      // Filter results that include the search term
      const filteredResults = listData.results.filter((p: { name: string }) =>
        p.name.includes(name.toLowerCase())
      );
      
      if (filteredResults.length === 0) {
        throw new Error('No Pokemon found matching your search');
      }
      
      // Fetch details for each matching Pokémon
      const pokeList = await Promise.all(
        // Limit to 21 results for performance
        filteredResults.slice(0, 21).map(async (p: { url: string }) => {
          const response = await fetch(p.url);
          return await response.json();
        })
      );

      setPokemonData(pokeList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setPokemonData([]);
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