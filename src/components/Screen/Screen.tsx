import React from "react";
import "./Screen.scss";
import { Pokemon } from "../../utils/pokeApiService";

interface ScreenProps {
  pokemon: Pokemon;
  isShiny: boolean;
  toggleShiny: () => void;

  showFrontSprite: boolean;      // NUEVO
  toggleSprite: () => void;      // NUEVO
}

const Screen: React.FC<ScreenProps> = ({
  pokemon,
  isShiny,
  toggleShiny,
  showFrontSprite,
  toggleSprite,
}) => {
  return (
    <div id="screen">
      <div id="topPicture">
        <div id="buttontopPicture1"></div>
        <div id="buttontopPicture2"></div>
      </div>

      <div id="picture">
        <img
          src={
            showFrontSprite
              ? isShiny
                ? pokemon.sprites.front_shiny
                : pokemon.sprites.front_default
              : isShiny
              ? pokemon.sprites.back_shiny
              : pokemon.sprites.back_default
          }
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

      <div
        id="bigbluebutton"
        onClick={toggleShiny}
        role="button"
        tabIndex={0}
        aria-label="Toggle shiny form"
        onKeyDown={(e) => {
          if (e.key === "Enter") toggleShiny();
        }}
      ></div>

      <div
        id="barbutton1"
        onClick={toggleSprite}
        role="button"
        tabIndex={0}
        aria-label="Toggle front/back sprite"
        onKeyDown={(e) => {
          if (e.key === "Enter") toggleSprite();
        }}
      ></div>

      <div id="barbutton2" onClick={() => console.log("Show back picture")}></div>
    </div>
  );
};

export default Screen;
