import { useState, useEffect } from 'react';
import Countries from './comopnents/Countries';

import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const countriesToShow =
    query === ''
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div>
      find countries <input value={query} onChange={handleSearchChange} />
      <Countries countries={countriesToShow} />
    </div>
  );
};

export default App;

//
