import { useState } from 'react';
import useFetch from './hooks/useFetch';
import CountryCard from './components/CountryCard';
import SearchBar from './components/SearchBar';
import CountryModal from './components/CountryModal';
import SkeletonCard from './components/SkeletonCard';
import './App.css';

const API = 'https://restcountries.com/v3.1/all?fields=name,capital,population,region,subregion,flags,languages,currencies,area';

function App() {
  const { data: countries, loading, error } = useFetch(API);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [sortBy, setSortBy] = useState('name'); // 'name' or 'population'
  const [favourites, setFavourites] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const toggleFavourite = (name) => {
    setFavourites(prev => 
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  const getRegionCount = (region) => {
    if (!countries) return 0;
    if (region === 'All') return countries.length;
    return countries.filter(c => c.region === region).length;
  };

  const filtered = (countries || []).filter(c =>
    c.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedRegion === 'All' || c.region === selectedRegion)
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.common.localeCompare(b.name.common);
    } else {
      return b.population - a.population;
    }
  });

  if (error) return <div className="error-message"><p>Error: {error}</p></div>;

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Country Explorer</h1>
      </header>

      <div className="controls">
        <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />
        <div className="sort-container">
          <label>Sort by: </label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Name (A-Z)</option>
            <option value="population">Population (High-Low)</option>
          </select>
        </div>
      </div>

      <div className='region-filters'>
        {regions.map(r => (
          <button
            key={r}
            className={selectedRegion === r ? 'active' : ''}
            onClick={() => setSelectedRegion(r)}
          >
            {r} <span className="badge">{getRegionCount(r)}</span>
          </button>
        ))}
      </div>

      <p className="results-count">
        Showing {filtered.length} of {countries?.length || 0} countries
        {favourites.length > 0 && ` (${favourites.length} favourites)`}
      </p>

      <div className='country-grid'>
        {loading ? (
          Array(12).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          sorted.map(c => (
            <CountryCard 
              key={c.name.common} 
              country={c} 
              isFavourite={favourites.includes(c.name.common)}
              onToggleFavourite={toggleFavourite}
              onClick={setSelectedCountry}
            />
          ))
        )}
      </div>

      <CountryModal 
        country={selectedCountry} 
        onClose={() => setSelectedCountry(null)} 
      />
    </div>
  );
}

export default App;
