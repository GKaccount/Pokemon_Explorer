import React from 'react';
import pokeball from '../images/pikachu.svg'; // Assuming you put the SVG inside 'src/assets'


function Header() {
  return (
    <header className="header">
       <img src={pokeball} alt="pokeball" className="header-icon" />
      <h1>Pokémon Explorer</h1>
      <img src={pokeball} alt="pokeball" className="header-icon" />
    </header>
  );
}

export default Header;
