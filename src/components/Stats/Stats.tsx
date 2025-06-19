import React, { useEffect, useState } from "react";
import "./Stats.scss";
import { fetchPokemonDescription } from "../../utils/pokeApiService";
import type { Pokemon} from "../../utils/pokeApiService";

interface StatsProps {
  pokemon: Pokemon;
  page: "basic" | "stats" | "description";
  isPowerOn : boolean
}

const typeColors: Record<string, string> = {
  water: "#3399ff",
  ice: "#aee7f8",
  electric: "#f7d100",
  fire: "#ff4c4c",
  poison: "#a040a0",
  steel: "#a8a8c0",
  ground: "#b38f5e",
  ghost: "#705898",
  grass: "#4e8234",
  dark: "#000000",
  bug: "#a8b820",
  flying: "#a890f0",
  fighting: "#c03028",
  dragon: "#7038f8",
  fairy: "#f0b6bc",
  normal: "#a8a878",
  rock: "#b8a038",
  psychic: "#f85888",
  shadow: "#403246",
  unknown: "#68a090",
};

const typeTranslations: Record<string, string> = {
  normal: "Normal",
  fire: "Fuego",
  water: "Agua",
  electric: "Eléctrico",
  grass: "Planta",
  ice: "Hielo",
  fighting: "Lucha",
  poison: "Veneno",
  ground: "Tierra",
  flying: "Volador",
  psychic: "Psíquico",
  bug: "Bicho",
  rock: "Roca",
  ghost: "Fantasma",
  dragon: "Dragón",
  dark: "Siniestro",
  steel: "Acero",
  fairy: "Hada",
  shadow: "Sombra",
  unknown: "Desconocido",
};

const Stats: React.FC<StatsProps> = ({ pokemon, page , isPowerOn}) => {
  const [description, setDescription] = useState<string>("");

  const heightInFeet = (pokemon.height / 3.048).toFixed(2);
  const weightInLbs = (pokemon.weight / 4.53592).toFixed(2);

  useEffect(() => {
    if (page === "description") {
      setDescription("Cargando descripción...");
      fetchPokemonDescription(pokemon.name)
        .then(setDescription)
        .catch(() => setDescription("Error al cargar la descripción."));
    }
  }, [page, pokemon.name]);

   if (!isPowerOn) {
    return <div id="stats" className="off"></div>;
  }

  return (
    <div id="stats">
      {page === "basic" ? (
        <div className="basic-info">
          <div>
            <strong>Name:</strong>{" "}
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </div>
          <div>
            <div className="type-line">
              <strong>Type:</strong>{" "}
              <div className="type-container">
                {pokemon.types.map(({ type }) => (
                  <span
                    key={type.name}
                    className="type-badge"
                    style={{
                      backgroundColor: typeColors[type.name] || "#666",
                      color: "#fff",
                    }}
                  >
                    {(typeTranslations[type.name] || type.name).toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <strong>Height:</strong> {heightInFeet} ft
          </div>
          <div>
            <strong>Weight:</strong> {weightInLbs} lbs
          </div>
        </div>
      ) : page === "stats" ? (
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
      ) : (
        <div className="description">
          <strong>Description: </strong>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default Stats;
