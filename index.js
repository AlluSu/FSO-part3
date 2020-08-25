const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

const getId = () => {
    const max = Number.MAX_SAFE_INTEGER
    const min = persons.length
    const id = Math.floor(Math.random() * (max - min + 1)) + min
    return id
}

app.post('/api/persons', (request, response) => {
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

    const person = {
        name: personData.name,
        number: personData.number,
        id: getId()
    }

    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(request)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()

})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const now = new Date()
    const info = `<div>Phonebook has info for ${persons.length} people</div>`
    response.write(info)
    const timestamp = `<div>${now}</div>`
    response.write(timestamp)
    response.end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})