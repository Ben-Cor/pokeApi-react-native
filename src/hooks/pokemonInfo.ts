import React, { useEffect, useState } from "react";

export default function pokemonInfo() {
  // This hook can be used to fetch or manage Pokemon information

    const [pokemonData, setPokemonData] = useState([]);

    //function to fetch Pokemon data from an API
    function getData() {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
            .then(response => response.json())
            .then(data => {
                setPokemonData(data.results);
            })
            .catch(error => console.error('Error fetching Pokemon data:', error));
    }

    useEffect(getData, []);

    return {
        pokemonData,
        getPokemonData: getData
    };
    }   