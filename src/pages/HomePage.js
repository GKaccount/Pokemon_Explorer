// src/pages/HomePage.js
import React, { useContext, useState, useMemo } from 'react';
import { PokemonContext } from '../contexts/PokemonContext';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import SortControls from '../components/SortControls';
import Pagination from '../components/Pagination';
import PokemonCard from '../components/PokemonCard';
import Loader from '../components/Loader';

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50];

function HomePage() {
  const { allPokemon } = useContext(PokemonContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState([]);
  const [sortOption, setSortOption] = useState('id');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const filtered = useMemo(() => {
    let result = allPokemon;

    if (searchTerm) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter.length > 0) {
      result = result.filter((p) =>
        typeFilter.some((type) =>
          p.types.map((t) => t.type.name).includes(type)
        )
      );
    }

    if (sortOption === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    } else {
      result = [...result].sort((a, b) => a.id - b.id);
    }

    return result;
  }, [allPokemon, searchTerm, typeFilter, sortOption]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  if (!allPokemon.length) return <Loader />;

  return (
    <>
      <div className="controls">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TypeFilter typeFilter={typeFilter} setTypeFilter={setTypeFilter} />
        <SortControls sortOption={sortOption} setSortOption={setSortOption} />
        <select onChange={(e) => setItemsPerPage(Number(e.target.value))} value={itemsPerPage} style={{height:"2.5rem", width:'7rem', borderRadius:'1rem', padding:'0.2rem'}}>
          {ITEMS_PER_PAGE_OPTIONS.map((num) => (
            <option key={num} value={num}>{num} per page</option>
          ))}
        </select>
      </div>

      <div className="pokemon-grid">
        {paginated.length > 0 ? (
          paginated.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
        ) : (
          <div className="no-results">No Pokémon found!</div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filtered.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default HomePage;
