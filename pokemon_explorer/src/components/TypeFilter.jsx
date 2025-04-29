import React from 'react';

const types = [
  '', 'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison',
  'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy'
];

function TypeFilter({ typeFilter, setTypeFilter }) {
  return (
    <select
      value={typeFilter}
      onChange={(e) => setTypeFilter(e.target.value)}
      className="type-filter"
    >
      <option value="">All Types</option>
      {types.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default TypeFilter;
