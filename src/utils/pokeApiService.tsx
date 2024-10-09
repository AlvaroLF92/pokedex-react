export interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
  };
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
    };
  }>;
}

export const fetchPokemon = async (pokemonName: string): Promise<Pokemon> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  if (!response.ok) {
    throw new Error("Error fetching Pokémon");
  }
  const data = await response.json();
  return {
    name: data.name,
    sprites: {
      front_default: data.sprites.front_default,
      back_default: data.sprites.back_default,
      front_shiny: data.sprites.front_shiny,
      back_shiny: data.sprites.back_shiny,
    },
    stats: data.stats,
    types: data.types,
  };
};
