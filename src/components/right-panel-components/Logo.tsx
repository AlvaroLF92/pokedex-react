import React from "react";
import "./logo.scss";


const Logo: React.FC = () => {
  return (
    <>
    <div className="logo">
      <img src="./src/assets/logo-2.svg" alt="Logo 2" />  
    </div>
    <div className="logo-2">
      <img src="./src/assets/logo-3.svg" alt="Logo 1" />  
    </div>
  </>
  );
};

export default Logo;
