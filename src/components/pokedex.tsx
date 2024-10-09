import React, { useEffect, useState } from "react";
import LeftPanel from "./left-panel-components/LeftPanel";
import RightPanel from "./right-panel-components/RightPanel";
import { fetchPokemon, Pokemon } from "../utils/pokeApiService";

const Pokedex: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isShiny, setIsShiny] = useState<boolean>(false);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const data = await fetchPokemon("mewtwo");
        setPokemon(data);
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
          <LeftPanel pokemon={pokemon}  isShiny={isShiny} toggleShiny={toggleShiny}/>
          <RightPanel 
          pokemon={pokemon}
          onPokemonChange={handlePokemonChange}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Pokedex;
