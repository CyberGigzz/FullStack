import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const api_key = import.meta.env.VITE_APP_API_KEY;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [city]);

  if (!weather) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>
        <strong>temperature:</strong> {Math.round(weather.main.temp - 273.15)}°C
      </p>
      <img
        src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
        alt={weather.weather[0].description}
      />
      <p>
        <strong>wind:</strong> {weather.wind.speed} m/s
      </p>
    </div>
  );
};

export default Weather;
