const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://admin:${password}@cluster0.rpcdzpj.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  console.log("phonebook:");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log(
    'Incorrect number of arguments provided!\n\nUsage examples:\n1. To list all persons:\n   node mongo.js secretpassword\n\n2. To add a new person:\n   node mongo.js secretpassword "Alice Smith" 555-444-3333'
  );
  process.exit(1);
}
