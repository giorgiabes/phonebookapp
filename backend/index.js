const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

function generateId(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// get info
app.get("/info", (request, response) => {
  const date = new Date();
  response.send(
    `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
    `
  );
});

// get all persons
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// get one person
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// delete one person
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

// add one person
app.post("/api/persons", (request, response) => {
  const body = request.body;
  const nameExists = persons.find((p) => p.name === body.name);

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  if (nameExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(10000, 1000),
  };

  persons = persons.concat(person);

  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
