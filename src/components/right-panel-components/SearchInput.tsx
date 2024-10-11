import React from "react";
import "./SearchInput.scss";

interface SearchInputProps {
  onPokemonChange: (pokemonName: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onPokemonChange }) => {
  const [inputPokemonName, setInputPokemonName] = React.useState<string>("");

  const formatPokemonName = (name: string) => {
    return name.replace(/\s+/g, "").toLowerCase();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPokemonName(event.target.value);
    console.log(event.target.value);
  };

  const handleSearch = () => {
    const formattedName = formatPokemonName(inputPokemonName.trim());
    if (formattedName) {
      onPokemonChange(formattedName);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ( event.key === "Enter") {
      handleSearch()
    }
  };

  return (
    <>
      <div id="search-input">
        <input
          type="text"
          placeholder="Buscar Pokémon"
          className="search-field"
          value={inputPokemonName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
    </>
  );
};

export default SearchInput;
