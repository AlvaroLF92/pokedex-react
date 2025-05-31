import React from "react";
import "./Stats.scss";
import { Pokemon } from "../../utils/pokeApiService";

interface StatsProps {
  pokemon: Pokemon;
  page: "basic" | "stats";
}

const Stats: React.FC<StatsProps> = ({ pokemon, page }) => {
  const types = pokemon.types.map((t) => t.type.name).join(", ");
  const heightInFeet = (pokemon.height / 3.048).toFixed(2);
  const weightInLbs = (pokemon.weight / 4.53592).toFixed(2);

  return (
    <div id="stats">
      {page === "basic" ? (
        <div className="basic-info">
          <div>
            <strong>Name:</strong> {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </div>
          <div>
            <strong>Type:</strong> {types}
          </div>
          <div>
            <strong>Height:</strong> {heightInFeet} ft
          </div>
          <div>
            <strong>Weight:</strong> {weightInLbs} lbs
          </div>
        </div>
      ) : (
        <>
          <strong>Stats:</strong>
          <ul>
            {pokemon.stats.map((statObj) => (
              <li key={statObj.stat.name}>
                <strong>{statObj.stat.name.replace("-", " ")}:</strong>{" "}
                {statObj.base_stat}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Stats;
