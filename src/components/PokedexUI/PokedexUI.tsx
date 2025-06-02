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
}

const PokedexUI: React.FC<PokedexUIProps> = ({
  pokemon,
  isShiny,
  toggleShiny,
  onPokemonChange,
  pokemonList,
  selectedPokemonName,
}) => {
  const [page, setPage] = useState<"basic" | "stats" | "description">("basic");
  const pages: Array<"basic" | "stats" | "description"> = ["basic", "stats", "description"];
  const [showFrontSprite, setShowFrontSprite] = useState(true);
  const [isReading, setIsReading] = useState(false);

  const triggerReadingAnimation = () => {
    setIsReading(true);
    setTimeout(() => setIsReading(false), 250);
  };

  const goToNext = () => {
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
    setShowFrontSprite(true);
  };

  const goToPrevious = () => {
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
    setShowFrontSprite(true);
  };

 const togglePage = () => {
  setPage((prev) => {
    const currentIndex = pages.indexOf(prev);
    const nextIndex = (currentIndex + 1) % pages.length;
    return pages[nextIndex];
  });
};


  const toggleSprite = () => {
    setShowFrontSprite((prev) => !prev);
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
          <div id="miniButtonGlass1"></div>
          <div id="miniButtonGlass2"></div>
          <div id="miniButtonGlass3"></div>
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
        />

        <div id="cross">
          <div
            id="leftcross"
            onClick={togglePage}
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
            onClick={togglePage}
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
        <div className="logo">
          <img src="./src/assets/logo-2.svg" alt="Logo 2" />
        </div>
        <div className="logo-2">
          <img src="./src/assets/logo-3.svg" alt="Logo 1" />
        </div>
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
