// import React from 'react';

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      <h2>Phonebook</h2>
      Search: <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
};

export default Filter;
