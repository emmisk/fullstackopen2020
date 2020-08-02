import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Person from "./components/Person"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPersonName, setNewPersonName] = useState("")
  const [newPersonNumber, setNewPersonNumber] = useState("")
  const [findPerson, setFindPerson] = useState("")

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const samePerson = persons.find(({ name }) => newPersonName === name)
    if (samePerson) {
      window.confirm(
        `${newPersonName} is already added to phonebook, replace the old number with a new one?`
      )

      const newPerson = { ...samePerson, number: newPersonNumber }
      personService.update(newPerson).then((returnedPerson) => {
        const newPersons = persons.map((p) =>
          p.id === samePerson.id ? returnedPerson : p
        )
        setPersons(newPersons)
        setNewPersonName("")
        setNewPersonNumber("")
      })
    } else {
      personService
        .create({
          name: newPersonName,
          number: newPersonNumber,
        })
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNewPersonName("")
          setNewPersonNumber("")
        })
    }
  }

  const removePerson = (person) => {
    const result = window.confirm(`Delete ${person.name}?`)

    if (result) {
      personService.removePerson(person.id)
      const filtered = persons.filter((p) => p.id !== person.id)
      setPersons(filtered)
    }
  }

  const handleNameChange = (event) => {
    setNewPersonName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewPersonNumber(event.target.value)
  }

  const handleFindChange = (event) => {
    setFindPerson(event.target.value)
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(findPerson.toLowerCase())
  )

  const personComponents = filteredPersons.map((person) => (
    <Person key={person.id} person={person} removePerson={removePerson} />
  ))

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <Filter findPerson={findPerson} handleFindChange={handleFindChange} />
      <PersonForm
        newPersonName={newPersonName}
        handleNameChange={handleNameChange}
        newPersonNumber={newPersonNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      {personComponents}
    </div>
  )
}

export default App
