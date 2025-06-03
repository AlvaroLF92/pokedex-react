import React, { useEffect, useState, useCallback } from "react";
import { fetchPokemon, Pokemon } from "../utils/pokeApiService";
import PokedexUI from "./PokedexUI/PokedexUI";

interface BasicPokemon {
  name: string;
  url: string;
}

const normalizeName = (name: string) => name.toLowerCase().replace(/\s/g, "-");

const Pokedex: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [selectedPokemonName, setSelectedPokemonName] = useState<string | null>(
    null
  );
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [pokemonCache, setPokemonCache] = useState<Record<string, Pokemon>>({});
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [page, setPage] = useState<"basic" | "stats" | "description">("basic");
  const [showFrontSprite, setShowFrontSprite] = useState(true);
  const [isReading, setIsReading] = useState(false);

  const pages: Array<"basic" | "stats" | "description"> = [
    "basic",
    "stats",
    "description",
  ];

  const triggerReadingAnimation = () => {
    setIsReading(true);
    setTimeout(() => setIsReading(false), 250);
  };

  const toggleAnimation = () => setIsAnimated((prev) => !prev);
  
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=251")
      .then((res) => res.json())
      .then((data) => {
        const names = data.results.map((p: BasicPokemon) =>
          normalizeName(p.name)
        );
        setPokemonList(names);
      })
      .catch(console.error);
  }, []);

  const handlePokemonChange = useCallback(
    async (newPokemonName: string) => {
      const normalized = normalizeName(newPokemonName);
      setSelectedPokemonName(normalized);

      const cached = pokemonCache[normalized];
      if (cached) {
        setPokemon(cached);
        setIsShiny(false);
        return;
      }

      try {
        const data = await fetchPokemon(normalized);
        setPokemon(data);
        setIsShiny(false);
        setPokemonCache((prevCache) => ({
          ...prevCache,
          [normalized]: data,
        }));
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    },
    [pokemonCache]
  );

  useEffect(() => {
    if (pokemonList.length > 0 && !selectedPokemonName) {
      handlePokemonChange(pokemonList[0]);
    }
  }, [pokemonList, selectedPokemonName, handlePokemonChange]);

  const toggleShiny = () => {
    setIsShiny((prev) => !prev);
  };

  const togglePage = (direction: "next" | "prev" = "next") => {
    const currentIndex = pages.indexOf(page);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % pages.length;
    } else {
      newIndex = (currentIndex - 1 + pages.length) % pages.length;
    }

    setPage(pages[newIndex]);
  };

  const toggleSprite = () => {
    setShowFrontSprite((prev) => !prev);
  };

  return (
    <div id="pokedex">
      {pokemon && selectedPokemonName && pokemonList.length > 0 ? (
        <PokedexUI
          pokemon={pokemon}
          isShiny={isShiny}
          toggleShiny={toggleShiny}
          onPokemonChange={handlePokemonChange}
          pokemonList={pokemonList}
          selectedPokemonName={selectedPokemonName}
          page={page}
          togglePage={togglePage}
          showFrontSprite={showFrontSprite}
          toggleSprite={toggleSprite}
          isAnimated={isAnimated}
          toggleAnimation={toggleAnimation}
          triggerReadingAnimation={triggerReadingAnimation}
          isReading={isReading}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Pokedex;
