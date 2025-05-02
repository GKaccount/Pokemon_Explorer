import React, { createContext, useEffect, useState } from 'react';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    async function fetchAllPokemon() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
      const data = await res.json();
      const details = await Promise.all(
        data.results.map(async (p) => {
          const res = await fetch(p.url);
          return res.json();
        })
      );
      setAllPokemon(details);
    }

    fetchAllPokemon();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <PokemonContext.Provider value={{ allPokemon, favorites, toggleFavorite }}>
      {children}
    </PokemonContext.Provider>
  );
};
