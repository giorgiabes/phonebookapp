import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const newObject = {
      name: newName,
      number: newNumber,
    };

    const personExists = persons.find((p) => p.name === newName);

    if (personExists) {
      if (
        confirm(
          `${personExists.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...personExists, number: newNumber };
        personService
          .updateNumber(personExists.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((p) => (p.id !== personExists.id ? p : response.data))
            );
          })
          .catch((error) => {
            setNotification({
              text: `Information of ${newName} has already been removed from server`,
              type: "error",
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== personExists.id));
          });
        setNewName("");
        setNewNumber("");
        setNotification({ text: "Number updated", type: "success" });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      } else {
        setNewName("");
        setNewNumber("");
      }
    } else {
      personService.create(newObject).then((response) => {
        setNewName("");
        setNewNumber("");
        setNotification({
          text: `Added ${response.data.name}`,
          type: "success",
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
    }
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((p) => p.id === id);
    if (confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .deleteOne(id)
        .then(setPersons(persons.filter((p) => p.id !== id)));
    }
  };

  const search = (e) => {
    e.preventDefault();
    setPersons(filteredPersons);
    setSearchTerm("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleCharChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter
        search={search}
        searchTerm={searchTerm}
        handleCharChange={handleCharChange}
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <Persons
            key={person.id}
            person={person}
            deletePerson={() => deletePerson(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
