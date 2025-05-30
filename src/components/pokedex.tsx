import React, { useEffect, useState } from "react";
import { fetchPokemon, Pokemon } from "../utils/pokeApiService";
import PokedexUI from "./PokedexUI/PokedexUI";

const Pokedex: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isShiny, setIsShiny] = useState<boolean>(false);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const data = await fetchPokemon("mewtwo");
        setPokemon(data);
        console.log(data);
        
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };
    getPokemon();
  }, []);
  const handlePokemonChange = async (newPokemonName: string) => {
    try {
      const data = await fetchPokemon(newPokemonName);
      setPokemon(data);
      setIsShiny(false);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  const toggleShiny = () => {
    setIsShiny((prev) => !prev);
  };

  return (
    <div id="pokedex">
      {pokemon ? (
        <>
          <PokedexUI toggleShiny={toggleShiny} pokemon={pokemon} isShiny={isShiny} onPokemonChange={handlePokemonChange}  />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Pokedex;
