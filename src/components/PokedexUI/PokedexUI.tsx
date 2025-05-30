import React from "react";
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
}

const PokedexUI: React.FC<PokedexUIProps> = ({
  pokemon,
  isShiny,
  toggleShiny,
  onPokemonChange
}) => {
  return (
  <div className="Pokedex-container">
    <div id="left">
      {/* BackgroundCurvesLeft */}
      <div id="bg_curve1_left"></div>
      <div id="bg_curve2_left"></div>

      {/* ButtonGlass */}
      <div id="curve1_left">
        <div id="buttonGlass">
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

      {/* Screen */}
      <Screen pokemon={pokemon} isShiny={isShiny} toggleShiny={toggleShiny} />

      {/* Cross */}
      <div id="cross">
        <div id="leftcross">
          <div id="leftT"></div>
        </div>
        <div id="topcross">
          <div id="upT"></div>
        </div>
        <div id="rightcross">
          <div id="rightT"></div>
        </div>
        <div id="midcross">
          <div id="midCircle"></div>
        </div>
        <div id="botcross">
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
      <Stats pokemon={pokemon}/>
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
