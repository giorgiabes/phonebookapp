require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

morgan.token("body", function (req, res) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());
app.use(express.static("dist"));

// function generateId(max, min) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

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
  Person.find({}).then((persons) => {
    response.json(persons);
  });
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
  // const nameExists = persons.find((p) => p.name === body.name);

  if (body.name === undefined) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  // if (nameExists) {
  //   return response.status(400).json({
  //     error: "name must be unique",
  //   });
  // }

  if (body.number === undefined) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });

  // persons = persons.concat(person);

  // response.json(persons);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
