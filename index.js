require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))
const Person = require('./models/person')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  }
]

const getId = () => {
  const max = Number.MAX_SAFE_INTEGER
  const min = persons.length
  const id = Math.floor(Math.random() * (max - min + 1)) + min
  return id
}

app.post('/api/persons', (request, response, next) => {
  const personData = request.body
  console.log(personData)
  if (!personData.name) {
    return response.status(400).json({
      error : 'name missing'
    })
  }
  if (!personData.number) {
    return response.status(400).json({
      error : 'number missing'
    })
  }
  if (persons.find(taken => taken.name === personData.name)) {
    return response.status(400).json({
      error : 'name is already taken'
    })
  }

  const person = new Person({
    name: personData.name,
    number: personData.number,
    id: getId()
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(person => {
    response.json(person)
  })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  const now = new Date()
  const info = `<div>Phonebook has info for ${persons.length} people</div>`
  response.write(info)
  const timestamp = `<div>${now}</div>`
  response.write(timestamp)
  response.end()
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, {new:true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})