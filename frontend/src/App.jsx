import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Alice Smith", number: "434-220-5050" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (e) => {
    e.preventDefault();

    const newObject = {
      name: newName,
      number: newNumber,
    };

    persons.map((person) => {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`);
      } else {
        setPersons(persons.concat(newObject));
        setNewName("");
        setNewNumber("");
      }
    });
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
