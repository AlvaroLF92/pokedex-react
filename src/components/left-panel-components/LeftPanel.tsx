import React from 'react';
import ButtonGlass from './control-components/ButtonGlass';
import Screen from './control-components/Screen';
import Cross from './control-components/Cross';
import { Pokemon } from '../../utils/pokeApiService';
import "./LeftPanel.scss"

interface LeftPanelProps {
  pokemon: Pokemon;
  isShiny: boolean;
  toggleShiny: () => void;
};

 const LeftPanel: React.FC<LeftPanelProps> = ({pokemon, isShiny , toggleShiny}) => {
  return (
    <div id="left">
      <ButtonGlass />
      <Screen pokemon={pokemon} isShiny={isShiny} toggleShiny={toggleShiny}/>
      <Cross />
      <div id="bg_curve1_left"></div>
      <div id="bg_curve2_left"></div>
    </div>
  );
};

export default LeftPanel;
