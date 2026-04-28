import { useState, useEffect, useMemo } from 'react';
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
  const [sortBy, setSortBy] = useState('name');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Persist favourites to localStorage
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('country-explorer-favs');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('country-explorer-favs', JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (name) => {
    setFavourites(prev => 
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  const regionCounts = useMemo(() => {
    if (!countries) return {};
    const counts = { All: countries.length };
    countries.forEach(c => {
      counts[c.region] = (counts[c.region] || 0) + 1;
    });
    return counts;
  }, [countries]);

  const filtered = useMemo(() => {
    return (countries || []).filter(c =>
      c.name.common.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) &&
      (selectedRegion === 'All' || c.region === selectedRegion)
    );
  }, [countries, debouncedSearchTerm, selectedRegion]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.common.localeCompare(b.name.common);
      } else {
        return b.population - a.population;
      }
    });
  }, [filtered, sortBy]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) return (
    <div className="error-message">
      <div className="error-content glass-panel">
        <p>Oops! Something went wrong.</p>
        <code>{error}</code>
        <button onClick={() => window.location.reload()} className="btn-secondary">Try Again</button>
      </div>
    </div>
  );

  return (
    <div className='app'>
      <header className={`app-header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="header-content container">
          <h1>🌍 Country Explorer</h1>
        </div>
      </header>

      <main>
        <div className="controls glass-panel">
          <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />
          <div className="sort-container">
            <label htmlFor="sort-select">Sort by</label>
            <select 
              id="sort-select"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name (A-Z)</option>
              <option value="population">Population</option>
            </select>
          </div>
        </div>

        <nav className='region-filters' aria-label="Region filters">
          {regions.map(r => (
            <button
              key={r}
              className={selectedRegion === r ? 'active' : ''}
              onClick={() => setSelectedRegion(r)}
            >
              {r} <span className="badge">{regionCounts[r] || 0}</span>
            </button>
          ))}
        </nav>

        <section className="results-info">
          <p className="results-count">
            Showing {filtered.length} of {countries?.length || 0} countries
            {favourites.length > 0 && (
              <span className="fav-info"> • {favourites.length} favorites</span>
            )}
          </p>
        </section>

        <div className='country-grid'>
          {loading ? (
            Array(12).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : sorted.length > 0 ? (
            sorted.map((c, index) => (
              <div 
                key={c.name.common} 
                style={{ animationDelay: `${(index % 20) * 0.05}s` }} 
                className="fade-in-up"
              >
                <CountryCard 
                  country={c} 
                  isFavourite={favourites.includes(c.name.common)}
                  onToggleFavourite={toggleFavourite}
                  onClick={setSelectedCountry}
                />
              </div>
            ))
          ) : (
            <div className="empty-state glass-panel fade-in-up">
              <h2>No countries found</h2>
              <p>We couldn't find any results for "{searchTerm}". Try a different search term or filter.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedRegion('All'); }}
                className="btn-secondary"
                style={{ marginTop: '24px' }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {isScrolled && (
        <button 
          className="scroll-top-btn fade-in-up" 
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}

      <CountryModal 
        country={selectedCountry} 
        onClose={() => setSelectedCountry(null)} 
      />
    </div>
  );
}

export default App;
