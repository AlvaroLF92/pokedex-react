import React from "react";
import "./SearchInput.scss";

interface SearchInputProps {
  onPokemonChange: (pokemonName: string) => void; 
}

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <>
      <div id="search-input">
        <input
          type="text"
          placeholder="Buscar Pokémon"
          className="search-field"
        />
      </div>
    </>
  );
};

export default SearchInput;
