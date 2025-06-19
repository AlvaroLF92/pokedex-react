import React from "react";
import PokedexUI from "./PokedexUI/PokedexUI";
import { usePokedex } from "../hooks/usePokedex";

const Pokedex: React.FC = () => {
  const {
    pokemon,
    selectedPokemonName,
    isShiny,
    isPowerOn,
    pokemonList,
    isAnimated,
    page,
    showFrontSprite,
    isReading,
    togglePower,
    handlePokemonChange,
    toggleShiny,
    toggleAnimation,
    togglePage,
    toggleSprite,
    triggerReadingAnimation,

  } = usePokedex();

  return (
    <div id="pokedex">
      {pokemon && selectedPokemonName && pokemonList.length > 0 ? (
        <PokedexUI
          pokemon={pokemon}
          isShiny={isShiny}
          toggleShiny={toggleShiny}
          onPokemonChange={handlePokemonChange}
          pokemonList={pokemonList}
          selectedPokemonName={selectedPokemonName}
          page={page}
          togglePage={togglePage}
          showFrontSprite={showFrontSprite}
          toggleSprite={toggleSprite}
          isAnimated={isAnimated}
          toggleAnimation={toggleAnimation}
          triggerReadingAnimation={triggerReadingAnimation}
          isReading={isReading}
          isPowerOn={isPowerOn}
          togglePower={togglePower}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Pokedex;
