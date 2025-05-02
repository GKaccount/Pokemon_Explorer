import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function DetailPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);

        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();

        const evoChain = [];
        let current = evoData.chain;
        do {
          evoChain.push(current.species.name);
          current = current.evolves_to[0];
        } while (current && current.species);

        setEvolution(evoChain);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    }

    fetchData();
  }, [id]);

  if (error) return <div className="error">Failed to load Pokémon details.</div>;
  if (!pokemon) return <div className="loader">Loading...</div>;

  return (
    <div className="pokemon-detail">
      <Link to="/">← Back</Link>
      <h1>{pokemon.name.toUpperCase()}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>ID: {pokemon.id}</p>

      <h3>Stats</h3>
      {pokemon.stats.map((s) => (
        <p key={s.stat.name}>
          {s.stat.name}: {s.base_stat}
        </p>
      ))}

      <h3>Abilities</h3>
      <ul>
        {pokemon.abilities.map((a) => (
          <li key={a.ability.name}>{a.ability.name}</li>
        ))}
      </ul>

      <h3>Moves</h3>
      <ul>
        {pokemon.moves.slice(0, 10).map((m) => (
          <li key={m.move.name}>{m.move.name}</li>
        ))}
      </ul>

      <h3>Evolution Chain</h3>
      <ul>
        {evolution.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DetailPage;
