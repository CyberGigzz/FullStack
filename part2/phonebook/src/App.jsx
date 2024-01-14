import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
// import axios from 'axios';
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });
  const [message, setMessage] = useState(null);

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
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNewPerson({
              name: "",
              number: "",
            });
            setMessage(`Updated ${returnedPerson.name}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setMessage(error.message);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    } else {
      personService
        .create(nameObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewPerson({
            name: "",
            number: "",
          });
          setMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(error.response.data, "text/html");
          let errorMessage = doc.body.textContent || "";
          errorMessage = errorMessage.split(".")[0];

          setMessage(errorMessage);

          setTimeout(() => {
            setMessage(null);
          }, 5000);
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
    if (window.confirm("Do you really want to delete this person?")) {
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
      <Notification message={message} />
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
