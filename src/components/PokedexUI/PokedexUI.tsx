import React from "react";
import Screen from "../Screen/Screen";
import type { Pokemon } from "../../utils/pokeApiService";
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
  triggerReadingAnimation: () => void;
  isReading: boolean;
  isPowerOn: boolean;
  togglePower: () => void;
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
  triggerReadingAnimation,
  isReading,
  isPowerOn,
  togglePower,
}) => {
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
            className={`${isReading ? "reading" : ""} ${
              !isPowerOn ? "off" : ""
            }`}
          >
            <div id="barbutton1"></div>
            <div id="reflect"></div>
          </div>
          <div
            id="miniButtonGlass1"
            className={`${page === "basic" ? "active" : ""} ${
              !isPowerOn ? "off" : ""
            }`}
          />
          <div
            id="miniButtonGlass2"
            className={`${page === "stats" ? "active" : ""} ${
              !isPowerOn ? "off" : ""
            }`}
          />
          <div
            id="miniButtonGlass3"
            className={`${page === "description" ? "active" : ""} ${
              !isPowerOn ? "off" : ""
            }`}
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
          isAnimated={isAnimated}
          toggleAnimation={toggleAnimation}
          isPowerOn={isPowerOn}
          togglePower={togglePower}
        />

        <div id="cross">
          <div
            id="leftcross"
            onClick={() => {
              if (isPowerOn) togglePage("prev");
            }}
            role="button"
            tabIndex={isPowerOn ? 0 : -1}
            aria-label="Toggle info page"
            aria-disabled={!isPowerOn}
            onKeyDown={(e) => {
              if (isPowerOn && e.key === "Enter") togglePage("prev");
            }}
            className={!isPowerOn ? "disabled" : ""}
          >
            <div id="leftT"></div>
          </div>

          <div
            id="topcross"
            onClick={() => {
              if (isPowerOn) goToNext();
            }}
            role="button"
            tabIndex={isPowerOn ? 0 : -1}
            aria-label="Next Pokémon"
            aria-disabled={!isPowerOn}
            onKeyDown={(e) => {
              if (isPowerOn && e.key === "Enter") goToNext();
            }}
            className={!isPowerOn ? "disabled" : ""}
          >
            <div id="upT"></div>
          </div>

          <div
            id="rightcross"
            onClick={() => {
              if (isPowerOn) togglePage("next");
            }}
            role="button"
            tabIndex={isPowerOn ? 0 : -1}
            aria-label="Toggle info page"
            aria-disabled={!isPowerOn}
            onKeyDown={(e) => {
              if (isPowerOn && e.key === "Enter") togglePage("next");
            }}
            className={!isPowerOn ? "disabled" : ""}
          >
            <div id="rightT"></div>
          </div>

          <div id="midcross">
            <div id="midCircle"></div>
          </div>

          <div
            id="botcross"
            onClick={() => {
              if (isPowerOn) goToPrevious();
            }}
            role="button"
            tabIndex={isPowerOn ? 0 : -1}
            aria-label="Previous Pokémon"
            aria-disabled={!isPowerOn}
            onKeyDown={(e) => {
              if (isPowerOn && e.key === "Enter") goToPrevious();
            }}
            className={!isPowerOn ? "disabled" : ""}
          >
            <div id="downT"></div>
          </div>
        </div>
      </div>

      <div id="right">
        <Stats pokemon={pokemon} page={page} isPowerOn={isPowerOn} />
        <SearchInput onPokemonChange={onPokemonChange} isPowerOn={isPowerOn} />
        <div id="bg_curve1_right"></div>
        <div id="bg_curve2_right"></div>
        <div id="curve1_right"></div>
        <div id="curve2_right"></div>
      </div>
    </div>
  );
};

export default PokedexUI;
