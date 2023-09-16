import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
// import axios from 'axios';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: '',
  });

  useEffect(() => {
    personService.getAll().then((initialNotes) => {
      setPersons(initialNotes);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newPerson.name,
      number: newPerson.number,
    };

    const existingPerson = persons.find(
      (person) => person.name === newPerson.name
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${newPerson.name} is already in the phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(existingPerson.id, nameObject)
          .then((returnedPerson) => {
            console.log(returnedPerson);
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNewPerson({
              name: '',
              number: '',
            });
          });
      }
    } else {
      personService.create(nameObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewPerson({
          name: '',
          number: '',
        });
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({
      ...newPerson,
      [name]: value,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Do you really want to delete this person?')) {
      personService.remove(id).then(() => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
      });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter the persons array based on the search term
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <PersonForm
        newPerson={newPerson}
        handleInputChange={handleInputChange}
        addName={addName}
      />

      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
