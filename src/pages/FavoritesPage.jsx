import React, { useContext } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';
import PokemonCard from '../components/PokemonCard';

function FavoritesPage() {
  const { allPokemon, favorites } = useContext(PokemonContext);
  const favPokemon = allPokemon.filter((p) => favorites.includes(p.id));

  return (
    <div>
      <h2>My Favorite Pokémon</h2>
      {favPokemon.length > 0 ? (
        <div className="pokemon-grid">
          {favPokemon.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      ) : (
        <p className="no-results">No favorites yet!</p>
      )}
    </div>
  );
}

export default FavoritesPage;
