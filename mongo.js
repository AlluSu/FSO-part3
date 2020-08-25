  const mongoose = require('mongoose')

  if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }

  if (process.argv.length === 3) {
    const password = process.argv[2]
    const url =
      `mongodb+srv://Allu:${password}@cluster0.edo6b.mongodb.net/phonebook-app?retryWrites=true&w=majority`
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    const personSchema = new mongoose.Schema({
      name: String,
      number: String
    })
    const Person = mongoose.model('Person', personSchema)
    console.log("Phonebook:")
    Person.find({}).then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
  }

  if (process.argv.length === 5) {
    const password = process.argv[2]
    const url =
      `mongodb+srv://Allu:${password}@cluster0.edo6b.mongodb.net/phonebook-app?retryWrites=true&w=majority`
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    const personSchema = new mongoose.Schema({
      name: String,
      number: String
    })
    const Person = mongoose.model('Person', personSchema)
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4]
    })
    person.save().then(response => {
      console.log(`Added ${person.name} number ${person.number} to phonebook`)
      mongoose.connection.close()
    })
  }