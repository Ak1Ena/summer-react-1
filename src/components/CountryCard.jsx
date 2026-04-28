function CountryCard({ country, isFavourite, onToggleFavourite, onClick }) {
  const pop = country.population.toLocaleString();
  const cap = country.capital ? country.capital[0] : 'N/A';
  const lang = country.languages
    ? Object.values(country.languages).slice(0, 2).join(', ')
    : 'N/A';

  return (
    <div className='country-card' onClick={() => onClick(country)}>
      <div className="card-image-container">
        <img
          src={country.flags.svg}
          alt={'Flag of ' + country.name.common}
          className='country-flag'
        />
        <button 
          className={`favourite-btn ${isFavourite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavourite(country.name.common);
          }}
        >
          {isFavourite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className='country-info'>
        <h3>{country.name.common}</h3>
        <p><strong>Capital:</strong> {cap}</p>
        <p><strong>Population:</strong> {pop}</p>
        <p><strong>Languages:</strong> {lang}</p>
      </div>
    </div>
  );
}

export default CountryCard;
