import React from 'react';

function SortControls({ sortOption, setSortOption }) {
  return (
    <>
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="sort-controls"
      style={{height:"2.5rem", width:'7rem', borderRadius:'1rem', padding:'0.2rem'}}
    >
    <option value="id">Sort By</option>
      <option value="id">ID</option>
      <option value="name">Name (A-Z)</option>
      <option value="name-desc">Name (Z-A)</option>
    </select>

    </>
  );
}

export default SortControls;
