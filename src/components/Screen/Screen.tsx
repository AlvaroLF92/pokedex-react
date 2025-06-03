import React from "react";
import "./Screen.scss";
import { Pokemon } from "../../utils/pokeApiService";

interface ScreenProps {
  pokemon: Pokemon;
  isShiny: boolean;
  toggleShiny: () => void;
  showFrontSprite: boolean;
  toggleSprite: () => void;
  isAnimated: boolean;
  toggleAnimation: () => void;
}

const Screen: React.FC<ScreenProps> = ({
  pokemon,
  isShiny,
  toggleShiny,
  showFrontSprite,
  toggleSprite,
  isAnimated,
  toggleAnimation,
}) => {
  const getSpriteUrl = () => {
    if (isAnimated) {
      const id = pokemon.id;
      const base =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated";

      return isShiny ? `${base}/shiny/${id}.gif` : `${base}/${id}.gif`;
    }

    return showFrontSprite
      ? isShiny
        ? pokemon.sprites.front_shiny
        : pokemon.sprites.front_default
      : isShiny
      ? pokemon.sprites.back_shiny
      : pokemon.sprites.back_default;
  };

  return (
    <div id="screen">
      <div id="topPicture">
        <div id="buttontopPicture1"></div>
        <div id="buttontopPicture2"></div>
      </div>

      <div id="picture">
        <img
          src={getSpriteUrl()}
          alt={pokemon.name}
          className={isAnimated ? "animated-sprite" : "static-sprite"}
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
        onClick={() => {
          if (!isAnimated) toggleSprite();
        }}
        role="button"
        tabIndex={isAnimated ? -1 : 0}
        aria-label="Toggle front/back sprite"
        aria-disabled={isAnimated}
        onKeyDown={(e) => {
          if (!isAnimated && e.key === "Enter") toggleSprite();
        }}
        className={isAnimated ? "disabled" : ""}
      ></div>

      <div
        id="barbutton2"
        onClick={toggleAnimation}
        role="button"
        tabIndex={0}
        aria-label="Toggle animated sprite"
        onKeyDown={(e) => {
          if (e.key === "Enter") toggleAnimation();
        }}
      ></div>
    </div>
  );
};

export default Screen;
