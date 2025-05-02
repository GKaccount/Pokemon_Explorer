import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PokemonContext } from '../contexts/PokemonContext';

function PokemonCard({ pokemon }) {
  const { favorites, toggleFavorite } = useContext(PokemonContext);

  return (
    <div className="pokemon-card">
      <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>ID: {pokemon.id}</p>
      <div className="types">
        {pokemon.types.map((t) => (
          <span key={t.slot} className={`type-badge ${t.type.name}`}>
            {t.type.name}
          </span>
        ))}
      </div>
      <div className="card-actions">
        <Link to={`/pokemon/${pokemon.id}`}>Details</Link>
        <button onClick={() => toggleFavorite(pokemon.id)}>
          {favorites.includes(pokemon.id) ? '★' : '☆'}
        </button>
      </div>
    </div>
  );
}

export default PokemonCard;
