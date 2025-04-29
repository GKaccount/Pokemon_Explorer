import React from 'react';

function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      
      <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>ID: {pokemon.id}</p>
      <div className="types">
        {pokemon.types.map((typeObj) => (
          <span key={typeObj.slot} className={`type-badge ${typeObj.type.name}`}>
            {typeObj.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
