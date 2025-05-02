import { useState, useEffect } from 'react';

export const usePokemonData = (id) => {
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon(data);

      const speciesRes = await fetch(data.species.url);
      const speciesData = await speciesRes.json();

      const evoRes = await fetch(speciesData.evolution_chain.url);
      const evoData = await evoRes.json();
      setEvolution(evoData);

      setLoading(false);
    }

    fetchDetails();
  }, [id]);

  return { pokemon, evolution, loading };
};
