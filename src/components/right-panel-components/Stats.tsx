import React from "react";
import "./Stats.scss";
import { Pokemon } from "../../utils/pokeApiService";
interface StatsProps {
  pokemon: Pokemon;
}

const Stats: React.FC<StatsProps> = ({ pokemon }) => {
  const capitalizeFirstLetter = (name: string) => {
    if (!name) return "";
    const lowerCaseName = name.toLowerCase();
    const firstLetter = lowerCaseName.charAt(0).toUpperCase();
    const restOfName = lowerCaseName.slice(1);

    return firstLetter + restOfName;
  };
  const pokemonTypes = pokemon.types.map((type, i) => {
    if (i == 0 && pokemon.types.length > 1) {
      return capitalizeFirstLetter(type.type.name) + " / ";
    } else {
      return capitalizeFirstLetter(type.type.name);
    }
  });

  return (
    <div id="stats">
      <div className="nameAndType">
        <strong>Name: </strong>
        <span>{capitalizeFirstLetter(pokemon.name)}</span>
        <strong> Type:</strong> <span>{pokemonTypes} </span>
      </div>
    </div>
  );
};

export default Stats;
