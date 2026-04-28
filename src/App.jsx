import { useState, useEffect } from 'react';
import useFetch from './hooks/useFetch';
import useDebounce from './hooks/useDebounce';
import CountryCard from './components/CountryCard';
import SearchBar from './components/SearchBar';
import CountryModal from './components/CountryModal';
import SkeletonCard from './components/SkeletonCard';
import './App.css';

const API = 'https://restcountries.com/v3.1/all?fields=name,capital,population,region,subregion,flags,languages,currencies,area,maps';

function App() {
  const { data: countries, loading, error } = useFetch(API);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [sortBy, setSortBy] = useState('name'); // 'name' or 'population'
  
  // Persist favourites to localStorage
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('country-explorer-favs');
    return saved ? JSON.parse(saved) : [];
  });

  // Theme toggle with localStorage persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('country-explorer-theme') || 'light';
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  useEffect(() => {
    localStorage.setItem('country-explorer-favs', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem('country-explorer-theme', theme);
    document.body.className = theme; // Apply theme to body
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

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
    c.name.common.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) &&
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
        <div className="header-content">
          <h1>🌍 Country Explorer</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
      </header>

      <div className="controls glass-panel">
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
          sorted.map((c, index) => (
            <div key={c.name.common} style={{ animationDelay: `${index * 0.05}s` }} className="fade-in-up">
              <CountryCard 
                country={c} 
                isFavourite={favourites.includes(c.name.common)}
                onToggleFavourite={toggleFavourite}
                onClick={setSelectedCountry}
              />
            </div>
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
