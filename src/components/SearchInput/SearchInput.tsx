import React, { useState } from "react";
import "./SearchInput.scss";

interface SearchInputProps {
  onPokemonChange: (pokemonName: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onPokemonChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    const normalized = inputValue.trim().toLowerCase();
    if (normalized) {
      onPokemonChange(normalized);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div id="search-input">
      <input
        type="text"
        placeholder="Buscar Pokémon"
        className="search-field"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchInput;
