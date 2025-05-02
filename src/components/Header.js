import React from 'react';
import { Link } from 'react-router-dom';
import pokeball from '../images/pikachu.svg';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img src={pokeball} alt="pokeball" />
        <h1>Pokémon Explorer</h1>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/compare">Compare</Link>
        
      </nav>
    </header>
  );
}

export default Header;
