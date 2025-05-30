import React from "react";
import "./Screen.scss";
import { Pokemon } from "../../utils/pokeApiService";

interface ScreenProps {
  pokemon: Pokemon;
  isShiny: boolean;
  toggleShiny: () => void;
}
const Screen: React.FC<ScreenProps> = ({ pokemon, isShiny, toggleShiny}) => {
  return (
    <div id="screen">
      <div id="topPicture">
        <div id="buttontopPicture1"></div>
        <div id="buttontopPicture2"></div>
      </div>
      <div id="picture">
        <img
          src={isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default}
          alt={pokemon.name}
          height="170"
        />
      </div>
      <div id="buttonbottomPicture"></div>
      <div id="speakers">
        <div className="sp"></div>
        <div className="sp"></div>
        <div className="sp"></div>
        <div className="sp"></div>
      </div>
      <div id="bigbluebutton" onClick={toggleShiny}>
      </div>
      <div
        id="barbutton1"
        onClick={() => console.log("Show front picture")}
      ></div>
      <div
        id="barbutton2"
        onClick={() => console.log("Show back picture")}
      ></div>
    </div>
  );
};

export default Screen;
