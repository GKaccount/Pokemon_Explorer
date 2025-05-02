import React, { useContext } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';
import PokemonCard from './PokemonCard';

const FavoritesPage = () => {
  const { favorites } = useContext(PokemonContext);

  return (
    <div className="favorites-page">
      <h2>Favorite Pokémon</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="card-grid">
          {favorites.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
