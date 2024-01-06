const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const Person = require("./models/person");

const app = express();

app.use(cors());

app.use(express.static("dist"));

app.use(express.json());
// app.use(morgan("combined"));
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens["response-time"](req, res),
      "-",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

app.get("/info", (request, response, next) => {
  Person.find({}).then((people) => {
    response.send(
      `<p>Phonebook has info for ${
        people.length
      } people</p><p>${new Date()}</p>`
    );
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end();
  });
});

function generateUniqueID() {
  const min = 1000; // Minimum ID
  const max = 9999; // Maximum ID
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post("/api/persons", (request, response, next) => {
  const { name, number } = request.body;

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
