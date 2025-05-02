import React, { useState } from 'react';

const ComparePage = () => {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [firstData, setFirstData] = useState(null);
  const [secondData, setSecondData] = useState(null);

  const fetchPokemon = async (name, setter) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      const data = await res.json();
      setter(data);
    } catch (err) {
      setter(null);
    }
  };

  const handleCompare = () => {
    if (first) fetchPokemon(first, setFirstData);
    if (second) fetchPokemon(second, setSecondData);
  };

  return (
    <div className="compare-page">
      <h2>Compare Pokémon</h2>
      <input value={first} onChange={(e) => setFirst(e.target.value)} placeholder="First Pokémon" />
      <input value={second} onChange={(e) => setSecond(e.target.value)} placeholder="Second Pokémon" />
      <button onClick={handleCompare}>Compare</button>

      <div className="comparison">
        {[firstData, secondData].map((p, i) =>
          p ? (
            <div key={i} className="compare-card">
              <h3>{p.name}</h3>
              <img src={p.sprites.front_default} alt={p.name} />
              <ul>
                {p.stats.map(stat => (
                  <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
                ))}
              </ul>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default ComparePage;
