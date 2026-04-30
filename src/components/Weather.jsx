import { useState, useEffect } from 'react';
import styles from '../assets/Weather.module.css';

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const CITY = import.meta.env.VITE_WEATHER_CITY || 'Bangkok';

  useEffect(() => {
    const fetchWeather = async () => {
      if (!API_KEY || API_KEY === 'your_actual_api_key_here') {
        setError('No API Key');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`
        );
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [API_KEY, CITY]);

  if (loading) return null;

  return (
    <div className={styles.weather}>
      {error ? (
        <p className={styles.error}>Weather: {error}</p>
      ) : (
        <>
          <span className={styles.icon}>
            {weather.weather[0].main === 'Clear' ? '☀️' : 
             weather.weather[0].main === 'Clouds' ? '☁️' : '🌧️'}
          </span>
          <div className={styles.info}>
            <p className={styles.temp}>{Math.round(weather.main.temp)}°C</p>
            <p className={styles.city}>{weather.name}, {weather.weather[0].description}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
