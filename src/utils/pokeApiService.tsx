export interface Pokemon {
  id: number;
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
  height: number; 
  weight: number; 
}
export interface Evolution {
  name: string;
  imageUrl: string;
}

interface EvolutionChainNode {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChainNode[];
}

interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
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
    id: data.id, 
    name: data.name,
    sprites: {
      front_default: data.sprites.front_default,
      back_default: data.sprites.back_default,
      front_shiny: data.sprites.front_shiny,
      back_shiny: data.sprites.back_shiny,
    },
    stats: data.stats,
    types: data.types,
    height: data.height, 
    weight: data.weight, 
  };
};


export const fetchEvolutionChain = async (
  pokemonName: string
): Promise<Evolution[]> => {
  const resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  if (!resPokemon.ok) {
    throw new Error("Error fetching Pokémon for evolution");
  }
  const pokemonData = await resPokemon.json();

  const resSpecies = await fetch(pokemonData.species.url);
  if (!resSpecies.ok) {
    throw new Error("Error fetching species data");
  }
  const speciesData = await resSpecies.json();

  const resEvolution = await fetch(speciesData.evolution_chain.url);
  if (!resEvolution.ok) {
    throw new Error("Error fetching evolution chain");
  }
  const evolutionData = await resEvolution.json();

  const evolutions: Evolution[] = [];

  const extractIdFromUrl = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  const traverseChain = (node: EvolutionChainNode) => {
    evolutions.push({
      name: node.species.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractIdFromUrl(
        node.species.url
      )}.png`,
    });

    if (node.evolves_to && node.evolves_to.length > 0) {
      node.evolves_to.forEach(traverseChain);
    }
  };

  traverseChain(evolutionData.chain);

  return evolutions;
};

export const fetchPokemonDescription = async (pokemonName: string): Promise<string> => {
  const resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
  if (!resSpecies.ok) {
    throw new Error("Error fetching species data");
  }
  const speciesData = await resSpecies.json();

  const flavorEntries: FlavorTextEntry[] = speciesData.flavor_text_entries;

  const flavorEntry = flavorEntries.find(
    (entry) => entry.language.name === "es"
  );

  if (!flavorEntry) {
    return "Descripción no disponible en español.";
  }

  return flavorEntry.flavor_text.replace(/\n|\f/g, " ");
};