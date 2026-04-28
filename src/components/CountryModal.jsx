import './CountryModal.css';

function CountryModal({ country, onClose }) {
  if (!country) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-body">
          <img src={country.flags.svg} alt={country.name.common} className="modal-flag" />
          <h2>{country.name.common} ({country.name.official})</h2>
          <div className="modal-details">
            <p><strong>Region:</strong> {country.region} ({country.subregion})</p>
            <p><strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Area:</strong> {country.area?.toLocaleString()} km²</p>
            <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
            <p><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryModal;
