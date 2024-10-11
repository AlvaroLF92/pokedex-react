import React from 'react';
import Stats from './Stats';
import SearchInput from './SearchInput';
import { Pokemon } from '../../utils/pokeApiService';
import "./RightPanel.scss"

interface RightPanelProps {
  pokemon: Pokemon;
  onPokemonChange: (pokemonName: string) => void;
};

const RightPanel: React.FC<RightPanelProps> = ({ pokemon, onPokemonChange}) => {
  return (
    <div id="right">
      <Stats pokemon={pokemon}/>
      <SearchInput onPokemonChange={onPokemonChange} />
      <div id="bg_curve1_right"></div>
      <div id="bg_curve2_right"></div>
      <div id="curve1_right"></div>
      <div id="curve2_right"></div>
    </div>
  );
};

export default RightPanel;
