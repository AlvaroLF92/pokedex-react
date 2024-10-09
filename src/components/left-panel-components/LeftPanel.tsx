import React from 'react';
import BackgroundCurvesLeft from './BackgroundCurvesLeft';
import ButtonGlass from './ButtonGlass';
import Screen from './Screen';
import Cross from './Cross';
import { Pokemon } from '../../utils/pokeApiService';

interface LeftPanelProps {
  pokemon: Pokemon;
  isShiny: boolean;
  toggleShiny: () => void;
};

 const LeftPanel: React.FC<LeftPanelProps> = ({pokemon, isShiny , toggleShiny}) => {
  return (
    <div id="left">
      <BackgroundCurvesLeft />
      <ButtonGlass />
      <Screen pokemon={pokemon} isShiny={isShiny} toggleShiny={toggleShiny}/>
      <Cross />
    </div>
  );
};

export default LeftPanel;
