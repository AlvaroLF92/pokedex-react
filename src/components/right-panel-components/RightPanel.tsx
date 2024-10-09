import React from 'react';
import Stats from './Stats';
import SearchInput from './SearchInput';
import BackgroundCurvesRight from './BackgroundCurvesRight';
import Logo from './Logo';
import { Pokemon } from '../../utils/pokeApiService';

interface RightPanelProps {
  pokemon: Pokemon;
  onPokemonChange: (pokemonName: string) => void;
};

const RightPanel: React.FC<RightPanelProps> = ({ pokemon, onPokemonChange}) => {
  return (
    <div id="right">
      <Logo/>
      <Stats pokemon={pokemon}/>
      <SearchInput onPokemonChange={onPokemonChange} />
      <BackgroundCurvesRight />
    </div>
  );
};

export default RightPanel;
