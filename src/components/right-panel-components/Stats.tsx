import React from "react";
import "./Stats.scss";
import { Pokemon } from "../../utils/pokeApiService";
interface StatsProps {
  pokemon: Pokemon;
}

const Stats: React.FC<StatsProps> = ({ pokemon }) => {
  const pokemonTypes = pokemon.types.map((type) => type.type.name);

  return (
    <div id="stats">
      <strong>Name:</strong> {pokemon.name}
      <br />
      <strong>Type:</strong>
      {pokemonTypes}
      <br />
      <strong>Height:</strong> 2'072''
      <br />
      <strong>Weight:</strong> 43.2 lbs.
      <br />
      <br />
      <strong>The duck Pokemon</strong>
      <br />
      Uses mysterious powers to perform various attacks.
    </div>
  );
};

export default Stats;
