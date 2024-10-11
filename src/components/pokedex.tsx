import React from "react";
import LeftPanel from "./left-panel-components/LeftPanel";
import RightPanel from "./right-panel-components/RightPanel";
import { fetchPokemon, Pokemon } from "../utils/pokeApiService";
import Logo from "./background-components/Logo";

const Pokedex: React.FC = () => {
  const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);
  const [isShiny, setIsShiny] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getPokemon = async () => {
      try {
        const data = await fetchPokemon("bulbasaur");
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
          <LeftPanel
            pokemon={pokemon}
            isShiny={isShiny}
            toggleShiny={toggleShiny}
          />
          <RightPanel pokemon={pokemon} onPokemonChange={handlePokemonChange} />
          <Logo/>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Pokedex;
