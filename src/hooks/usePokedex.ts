import { useEffect, useState, useCallback } from "react";
import { fetchPokemon } from "../utils/pokeApiService";
import type { Pokemon } from "../utils/pokeApiService";

const normalizeName = (name: string) => name.toLowerCase().replace(/\s/g, "-");

export type Page = "basic" | "stats" | "description";

export interface PokemonState {
  pokemon: Pokemon | null;
  selectedPokemonName: string | null;
  isShiny: boolean;
  pokemonList: string[];
  isAnimated: boolean;
  page: Page;
  showFrontSprite: boolean;
  isReading: boolean;
  handlePokemonChange: (name: string) => void;
  toggleShiny: () => void;
  toggleAnimation: () => void;
  togglePage: (direction?: "next" | "prev") => void;
  toggleSprite: () => void;
  triggerReadingAnimation: () => void;
  isPowerOn: boolean;
  togglePower: () => void;
}

export function usePokedex(): PokemonState {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [selectedPokemonName, setSelectedPokemonName] = useState<string | null>(
    null
  );
  const [isShiny, setIsShiny] = useState(false);
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [pokemonCache, setPokemonCache] = useState<Record<string, Pokemon>>({});
  const [isAnimated, setIsAnimated] = useState(false);
  const [page, setPage] = useState<Page>("basic");
  const [showFrontSprite, setShowFrontSprite] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const [isPowerOn, setIsPowerOn] = useState(false);

  const pages: Page[] = ["basic", "stats", "description"];
  const toggleShiny = () => setIsShiny((prev) => !prev);
  const togglePower = () => {
    setIsPowerOn((prev) => {
      const next = !prev;

      if (!next) {
        setIsShiny(false);
        setIsAnimated(false);
        setPage("basic");
        setShowFrontSprite(true);
        setIsReading(false);
      } else {
        handlePokemonChange("bulbasaur");
      }

      return next;
    });
  };

  const toggleAnimation = () => setIsAnimated((prev) => !prev);
  const toggleSprite = () => setShowFrontSprite((prev) => !prev);
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

  const triggerReadingAnimation = () => {
    setIsReading(true);
    setTimeout(() => setIsReading(false), 250);
  };

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
        setPokemonCache((prev) => ({
          ...prev,
          [normalized]: data,
        }));
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    },
    [pokemonCache]
  );

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=251")
      .then((res) => res.json())
      .then((data) => {
        const names = data.results.map((p: { name: string }) =>
          normalizeName(p.name)
        );
        setPokemonList(names);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (pokemonList.length > 0 && !selectedPokemonName) {
      handlePokemonChange(pokemonList[0]);
    }
  }, [pokemonList, selectedPokemonName, handlePokemonChange]);

  return {
    pokemon,
    selectedPokemonName,
    isShiny,
    pokemonList,
    isAnimated,
    page,
    showFrontSprite,
    isReading,
    handlePokemonChange,
    toggleShiny,
    toggleAnimation,
    togglePage,
    toggleSprite,
    triggerReadingAnimation,
    togglePower,
    isPowerOn,
  };
}
