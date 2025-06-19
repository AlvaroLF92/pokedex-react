import React, { useEffect, useState } from "react";
import "./Screen.scss";
import type { Pokemon } from "../../utils/pokeApiService";

interface ScreenProps {
  pokemon: Pokemon;
  isShiny: boolean;
  toggleShiny: () => void;
  showFrontSprite: boolean;
  toggleSprite: () => void;
  isAnimated: boolean;
  toggleAnimation: () => void;
  isPowerOn: boolean;
  togglePower: () => void;
}

const Screen: React.FC<ScreenProps> = ({
  pokemon,
  isShiny,
  toggleShiny,
  showFrontSprite,
  toggleSprite,
  isAnimated,
  toggleAnimation,
  isPowerOn,
  togglePower,
}) => {
  const [powerState, setPowerState] = useState(0); // 0: off, 1: dot, 2: line, 3: show sprite

  useEffect(() => {
    if (isPowerOn) {
      setPowerState(1);
      const timer1 = setTimeout(() => setPowerState(2), 500);
      const timer2 = setTimeout(() => setPowerState(3), 1000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setPowerState(0);
    }
  }, [isPowerOn]);

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

      <div
        id="picture"
        style={{ backgroundColor: powerState < 3 ? "black" : "white" }}
      >
        {isPowerOn ? (
          powerState === 0 ? (
            <div className="power-dot" />
          ) : powerState === 1 ? (
            <div className="power-dot" />
          ) : powerState === 2 ? (
            <div className="power-line" />
          ) : (
            <img
              src={getSpriteUrl()}
              alt={pokemon.name}
              className={isAnimated ? "animated-sprite" : "static-sprite"}
            />
          )
        ) : (
          <div className="black-screen" />
        )}
      </div>

      <div id="buttonbottomPicture" onClick={togglePower}></div>

      <div id="speakers">
        <div className="sp"></div>
        <div className="sp"></div>
        <div className="sp"></div>
        <div className="sp"></div>
      </div>

      <div
        id="bigbluebutton"
        onClick={() => {
          if (isPowerOn) toggleShiny();
        }}
        role="button"
        tabIndex={isPowerOn ? 0 : -1}
        aria-label="Toggle shiny form"
        aria-disabled={!isPowerOn}
        onKeyDown={(e) => {
          if (isPowerOn && e.key === "Enter") toggleShiny();
        }}
        className={!isPowerOn ? "disabledScreen" : ""}
      />

      <div
        id="barbutton1"
        onClick={() => {
          if (isPowerOn && !isAnimated) toggleSprite();
        }}
        role="button"
        tabIndex={isPowerOn && !isAnimated ? 0 : -1}
        aria-label="Toggle front/back sprite"
        aria-disabled={!isPowerOn || isAnimated}
        onKeyDown={(e) => {
          if (isPowerOn && !isAnimated && e.key === "Enter") toggleSprite();
        }}
        className={!isPowerOn || isAnimated ? "disabledScreen" : ""}
      />

      <div
        id="barbutton2"
        onClick={() => {
          if (isPowerOn) toggleAnimation();
        }}
        role="button"
        tabIndex={isPowerOn ? 0 : -1}
        aria-label="Toggle animated sprite"
        aria-disabled={!isPowerOn}
        onKeyDown={(e) => {
          if (isPowerOn && e.key === "Enter") toggleAnimation();
        }}
        className={!isPowerOn ? "disabledScreen" : ""}
      />
    </div>
  );
};

export default Screen;
