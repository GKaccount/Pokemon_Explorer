import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import PokemonCard from './components/PokemonCard';
import Loader from './components/Loader';

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await res.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );
        setAllPokemon(pokemonDetails);
        setDisplayedPokemon(pokemonDetails);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemon();
  }, []);

  useEffect(() => {
    let filtered = allPokemon;
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (typeFilter) {
      filtered = filtered.filter((p) =>
        p.types.some((t) => t.type.name === typeFilter)
      );
    }
    setDisplayedPokemon(filtered);
  }, [searchTerm, typeFilter, allPokemon]);

  if (loading) return <Loader />;
  if (error) return <div className="error">Error loading Pokémon 😢</div>;

  return (
    <div className="container">
      <Header />
      <div className="controls">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TypeFilter typeFilter={typeFilter} setTypeFilter={setTypeFilter} />
      </div>
      <div className="pokemon-grid">
        {displayedPokemon.length > 0 ? (
          displayedPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <div className="no-results">No Pokémon found!</div>
        )}
      </div>
    </div>
  );
}

export default App;
