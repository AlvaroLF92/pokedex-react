import React from "react";
import "./Stats.scss";
import { Pokemon } from "../../utils/pokeApiService";

interface StatsProps {
  pokemon: Pokemon;
}

const Stats: React.FC<StatsProps> = ({ pokemon }) => {
  const types = pokemon.types.map((t) => t.type.name).join(", ");
  const heightInFeet = (pokemon.height / 3.048).toFixed(2); 
  const weightInLbs = (pokemon.weight / 4.53592).toFixed(2); 

  return (
    <div id="stats">
      <strong>Name:</strong> {pokemon.name}
      <br />
      <strong>Type:</strong> {types}
      <br />
      <strong>Height:</strong> {heightInFeet} ft
      <br />
      <strong>Weight:</strong> {weightInLbs} lbs
      <br />
      <br />
      <strong>Stats:</strong>
      <ul>
        {pokemon.stats.map((statObj) => (
          <li key={statObj.stat.name}>
            <strong>{statObj.stat.name.replace("-", " ")}:</strong> {statObj.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stats;
