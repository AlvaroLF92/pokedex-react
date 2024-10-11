import React from "react";
import "./ButtonGlass.scss";

const ButtonGlass: React.FC = () => {
  return (
    <>
      <div id="curve1_left">
        <div id="buttonGlass">
          <div id="reflect"></div>
        </div>
        <div id="miniButtonGlass1"></div>
        <div id="miniButtonGlass2"></div>
        <div id="miniButtonGlass3"></div>
      </div>

      <div id="curve2_left">
        <div id="junction">
          <div id="junction1"></div>
          <div id="junction2"></div>
        </div>
      </div>
    </>
  );
};
export default ButtonGlass;
