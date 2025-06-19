import React, { useState } from "react";
import "./SearchInput.scss";

interface SearchInputProps {
  onPokemonChange: (pokemonName: string) => void;
  isPowerOn: boolean; 
}

const normalizeName = (name: string) => name.toLowerCase().replace(/\s/g, "-");

const SearchInput: React.FC<SearchInputProps> = ({ onPokemonChange, isPowerOn }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (!isPowerOn) return; 

    const normalized = normalizeName(inputValue.trim());
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
        disabled={!isPowerOn} 
      />
      <button
        className="search-button"
        onClick={handleSearch}
        disabled={!isPowerOn} 
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
