import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);

        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();

        const chain = [];
        let evo = evoData.chain;
        while (evo) {
          chain.push(evo.species.name);
          evo = evo.evolves_to[0];
        }
        setEvolution(chain);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetails();
  }, [id]);

  if (!pokemon) return <div className="loading">Loading...</div>;

  return (
    <div className="detail-view">
      <h2>{pokemon.name} (#{pokemon.id})</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p><strong>Types:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
      <p><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
      <p><strong>Stats:</strong></p>
      <ul>
        {pokemon.stats.map(stat => (
          <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
        ))}
      </ul>
      <p><strong>Moves:</strong> {pokemon.moves.slice(0, 5).map(m => m.move.name).join(', ')}...</p>
      <p><strong>Evolution Chain:</strong> {evolution.join(' → ')}</p>
    </div>
  );
};

export default Detail;
