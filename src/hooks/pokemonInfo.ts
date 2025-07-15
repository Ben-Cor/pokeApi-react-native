import React, { useEffect, useState } from "react";

export default function pokemonInfo() {
  // This hook can be used to fetch or manage Pokemon information

    const [pokemonData, setPokemonData] = useState([]);

    //function to fetch Pokemon data from an API
    function getData(name: string) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`) 
            .then(response => response.json())
            .then(data => {
                setPokemonData(data.results);
            })
            .catch(error => console.error('Error fetching Pokemon data:', error));
    }

    useEffect(() => {
        getData('pikachu'); // return a default pokemon on load
    }, []);

    return {
        // Expose the pokemonData and getData function
        pokemonData,
        getPokemonData: getData
    };
    }   