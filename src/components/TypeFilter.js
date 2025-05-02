import React from 'react';

const types = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison',
  'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy'
];

function TypeFilter({ typeFilter, setTypeFilter }) {
  const handleChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setTypeFilter(selectedOptions);
  };

  return (
    <div className="type-filter-wrapper">
      <label htmlFor="type-filter">Filter by Type:</label>
      <select
        id="type-filter"
        multiple
        value={typeFilter}
        onChange={handleChange}
        className="type-filter"
        style={{ height: '100px', padding: '3px', borderRadius: '10px' }}
      >
        {types.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
      <p style={{ fontSize: '0.9rem', marginTop: '5px' }}>
        Hold Ctrl (Cmd on Mac) to select multiple types
      </p>
    </div>
  );
}

export default TypeFilter;
