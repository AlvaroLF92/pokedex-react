import React from "react";
import "./Screen.scss";
import { Pokemon } from "../../utils/pokeApiService";

interface ScreenProps {
  pokemon: Pokemon;
  isShiny: boolean;
  toggleShiny: () => void;
  screenIndex: number;
}

const Screen: React.FC<ScreenProps> = ({ pokemon, isShiny, toggleShiny, screenIndex }) => {
  const renderScreenContent = () => {
    switch (screenIndex) {
      case 0:
        return (
          <img
            src={isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default}
            alt={pokemon.name}
            height="170"
          />
        );
      case 1:
        return (
          <div className="info-screen">
            <p><strong>Name:</strong> {pokemon.name}</p>
            <p><strong>Type:</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
            <p><strong>Height:</strong> {pokemon.height}</p>
            <p><strong>Weight:</strong> {pokemon.weight}</p>
          </div>
        );
      case 2:
        return (
          <div className="stats-screen">
            <p><strong>Stats:</strong></p>
            <ul>
              {pokemon.stats.map(stat => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return <p>No screen available.</p>;
    }
  };

  return (
    <div id="screen">
      <div id="topPicture">
        <div id="buttontopPicture1"></div>
        <div id="buttontopPicture2"></div>
      </div>

      <div id="picture">
        {renderScreenContent()}
      </div>

      <div id="buttonbottomPicture"></div>

      <div id="speakers">
        <div className="sp"></div>
        <div className="sp"></div>
        <div className="sp"></div>
        <div className="sp"></div>
      </div>

      <div id="bigbluebutton" onClick={toggleShiny}></div>

      <div id="barbutton1" onClick={() => console.log("Show back / front picture")}></div>
      <div id="barbutton2" onClick={() => console.log("Show back picture")}></div>
    </div>
  );
};

export default Screen;
