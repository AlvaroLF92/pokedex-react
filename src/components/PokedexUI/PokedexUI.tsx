import React, { useState } from "react";
import Screen from "../Screen/Screen";
import { Pokemon } from "../../utils/pokeApiService";
import "./PokedexUI.scss";
import Stats from "../Stats/Stats";
import SearchInput from "../SearchInput/SearchInput";

interface PokedexUIProps {
  pokemon: Pokemon;
  isShiny: boolean;
  toggleShiny: () => void;
  onPokemonChange: (pokemonName: string) => void;
  pokemonList: string[];
  selectedPokemonName: string;
  page: "basic" | "stats" | "description";
  togglePage: (direction?: "next" | "prev") => void;
  showFrontSprite: boolean;
  toggleSprite: () => void;
  isAnimated: boolean;
  toggleAnimation: () => void;
}

const PokedexUI: React.FC<PokedexUIProps> = ({
  pokemon,
  isShiny,
  toggleShiny,
  onPokemonChange,
  pokemonList,
  selectedPokemonName,
  page,
  togglePage,
  showFrontSprite,
  toggleSprite,
  isAnimated,
  toggleAnimation,
}) => {
  const [isReading, setIsReading] = useState(false);

  const triggerReadingAnimation = () => {
    setIsReading(true);
    setTimeout(() => setIsReading(false), 250);
  };

  const goToNext = () => {
    if (!showFrontSprite) {
      toggleSprite();
    }
    if (!pokemonList.length) return;
    const index = pokemonList.indexOf(selectedPokemonName);
    if (index === -1) {
      console.warn(
        "Pokémon actual no encontrado en la lista:",
        selectedPokemonName
      );
      return;
    }
    triggerReadingAnimation();
    const nextIndex = (index + 1) % pokemonList.length;
    onPokemonChange(pokemonList[nextIndex]);
  };

  const goToPrevious = () => {
    if (!showFrontSprite) {
      toggleSprite();
    }
    if (!pokemonList.length) return;
    const index = pokemonList.indexOf(selectedPokemonName);
    if (index === -1) {
      console.warn(
        "Pokémon actual no encontrado en la lista:",
        selectedPokemonName
      );
      return;
    }
    triggerReadingAnimation();
    const prevIndex = (index - 1 + pokemonList.length) % pokemonList.length;
    onPokemonChange(pokemonList[prevIndex]);
  };

  return (
    <div className="Pokedex-container">
      <div id="left">
        <div id="bg_curve1_left"></div>
        <div id="bg_curve2_left"></div>

        <div id="curve1_left">
          <div
            id="buttonGlass"
            role="button"
            tabIndex={0}
            className={isReading ? "reading" : ""}
          >
            <div id="barbutton1"></div>
            <div id="reflect"></div>
          </div>
          <div
            id="miniButtonGlass1"
            className={page === "basic" ? "active" : ""}
          />
          <div
            id="miniButtonGlass2"
            className={page === "stats" ? "active" : ""}
          />
          <div
            id="miniButtonGlass3"
            className={page === "description" ? "active" : ""}
          />
        </div>

        <div id="curve2_left">
          <div id="junction">
            <div id="junction1"></div>
            <div id="junction2"></div>
          </div>
        </div>

        <Screen
          pokemon={pokemon}
          isShiny={isShiny}
          toggleShiny={toggleShiny}
          toggleSprite={toggleSprite}
          showFrontSprite={showFrontSprite}
          isAnimated={isAnimated} // 👈 nuevo
          toggleAnimation={toggleAnimation}
        />

        <div id="cross">
          <div
            id="leftcross"
            onClick={() => togglePage("prev")}
            role="button"
            tabIndex={0}
            aria-label="Toggle info page"
            onKeyDown={(e) => {
              if (e.key === "Enter") togglePage();
            }}
          >
            <div id="leftT"></div>
          </div>
          <div
            id="topcross"
            onClick={goToNext}
            role="button"
            tabIndex={0}
            aria-label="Next Pokémon"
            onKeyDown={(e) => {
              if (e.key === "Enter") goToNext();
            }}
          >
            <div id="upT"></div>
          </div>
          <div
            id="rightcross"
            onClick={() => togglePage("next")}
            role="button"
            tabIndex={0}
            aria-label="Toggle info page"
            onKeyDown={(e) => {
              if (e.key === "Enter") togglePage();
            }}
          >
            <div id="rightT"></div>
          </div>
          <div id="midcross">
            <div id="midCircle"></div>
          </div>
          <div
            id="botcross"
            onClick={goToPrevious}
            role="button"
            tabIndex={0}
            aria-label="Previous Pokémon"
            onKeyDown={(e) => {
              if (e.key === "Enter") goToPrevious();
            }}
          >
            <div id="downT"></div>
          </div>
        </div>
      </div>

      <div id="right">
        <Stats pokemon={pokemon} page={page} />
        <SearchInput onPokemonChange={onPokemonChange} />
        <div id="bg_curve1_right"></div>
        <div id="bg_curve2_right"></div>
        <div id="curve1_right"></div>
        <div id="curve2_right"></div>
      </div>
    </div>
  );
};

export default PokedexUI;
