import React, { useContext, useState } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';

function ComparisonTool() {
  const { allPokemon } = useContext(PokemonContext);
  const [firstId, setFirstId] = useState('');
  const [secondId, setSecondId] = useState('');

  const first = allPokemon.find((p) => p.id === parseInt(firstId));
  const second = allPokemon.find((p) => p.id === parseInt(secondId));

  const renderStats = (pokemon) =>
    pokemon?.stats.map((s) => (
      <p key={s.stat.name}>
        {s.stat.name}: {s.base_stat}
      </p>
    ));

  return (
    <div className="comparison">
      <h2>Compare Pokémon</h2>
      <select value={firstId} onChange={(e) => setFirstId(e.target.value)}>
        <option value="">Select First</option>
        {allPokemon.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <select value={secondId} onChange={(e) => setSecondId(e.target.value)}>
        <option value="">Select Second</option>
        {allPokemon.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      <div className="comparison-grid">
        <div>{first && <>{<h3>{first.name}</h3>}{renderStats(first)}</>}</div>
        <div>{second && <>{<h3>{second.name}</h3>}{renderStats(second)}</>}</div>
      </div>
    </div>
  );
}

export default ComparisonTool;
