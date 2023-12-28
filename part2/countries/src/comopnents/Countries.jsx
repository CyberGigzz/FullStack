import { useState } from "react";
import Weather from "./Weather";

const Countries = ({ countries }) => {
  const [shownCountry, setShownCountry] = useState(null);
  console.log(countries);

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button
              onClick={() =>
                shownCountry === country
                  ? setShownCountry(null)
                  : setShownCountry(country)
              }
            >
              {shownCountry === country ? "hide" : "show"}
            </button>
            {shownCountry === country && (
              <div>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital[0]}</p>
                <p>area {country.area} km²</p>
                <img
                  src={country.flags.png}
                  alt={`flag of ${country.name.common}`}
                />
                <h2>Languages</h2>
                <ul>
                  {Object.values(country.languages).map((language, i) => (
                    <li key={i}>{language}</li>
                  ))}
                </ul>
                <Weather city={country.capital[0]} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  } else if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area} km²</p>
        <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language, i) => (
            <li key={i}>{language}</li>
          ))}
        </ul>
        <Weather city={country.capital[0]} />
      </div>
    );
  }

  return null;
};

export default Countries;
