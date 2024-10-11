import React from "react";
import "./Screen.scss";
import { Pokemon } from "../../../utils/pokeApiService";

interface ScreenProps {
  pokemon: Pokemon;
  isShiny: boolean;
  toggleShiny: () => void;
}

const Screen: React.FC<ScreenProps> = ({ pokemon, isShiny, toggleShiny }) => {
  const [isFrontSprite, setIsFrontSprite] = React.useState(true);

  React.useEffect(() => {
    setIsFrontSprite(true)
  }, [pokemon]);

  const spriteViewChange = () => {
    setIsFrontSprite((prev) => !prev);
  };

  return (
    <div id="screen">
      <div id="topPicture">
        <div id="buttontopPicture1"></div>
        <div id="buttontopPicture2"></div>
      </div>
      <div id="picture">
        <img
          src={
            isShiny
              ? isFrontSprite
                ? pokemon.sprites.front_shiny
                : pokemon.sprites.back_shiny
              : isFrontSprite
              ? pokemon.sprites.front_default
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
      <div id="bigbluebutton" onClick={toggleShiny}></div>
      <div
        id="barbutton1"
        onClick={spriteViewChange}
      ></div>
      <div
        id="barbutton2"
        onClick={() => console.log("Show back picture")}
      ></div>
    </div>
  );
};

export default Screen;
