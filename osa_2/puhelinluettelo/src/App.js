import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Person from "./components/Person"
import personService from "./services/persons"
import Notification from "./components/Notification"

const App = () => {
  const initialState = {
    text: null,
    isError: false,
  }

  const [persons, setPersons] = useState([])
  const [newPersonName, setNewPersonName] = useState("")
  const [newPersonNumber, setNewPersonNumber] = useState("")
  const [findPerson, setFindPerson] = useState("")
  const [notificationMessage, setNotificationMessage] = useState(initialState)

  console.log(notificationMessage)

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
      personService
        .update(newPerson)
        .then((returnedPerson) => {
          const newPersons = persons.map((p) =>
            p.id === samePerson.id ? returnedPerson : p
          )
          setPersons(newPersons)
          setNewPersonName("")
          setNewPersonNumber("")
        })
        .then((returnedPerson) => {
          setNotificationMessage({
            text: `${newPersonName}'s number is changed`,
            isError: false,
          })
          setTimeout(() => {
            setNotificationMessage(initialState)
          }, 5000)
        })
        .catch((error) => {
          setNotificationMessage({
            text: `Information of ${newPersonName} has already been removed from server`,
            isError: true,
          })
          setTimeout(() => {
            setNotificationMessage(initialState)
          }, 5000)
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
        .then((returnedPerson) => {
          setNotificationMessage({
            text: `${newPersonName} is added`,
            isError: false,
          })
          setTimeout(() => {
            setNotificationMessage(initialState)
          }, 5000)
        })
        .catch((error) => {
          setNotificationMessage({
            text: `Cannot add ${newPersonName}`,
            isError: true,
          })
          setTimeout(() => {
            setNotificationMessage(initialState)
          }, 5000)
        })
    }
  }

  const removePerson = (person) => {
    const result = window.confirm(`Delete ${person.name}?`)

    if (result) {
      personService.removePerson(person.id)
      const filtered = persons.filter((p) => p.id !== person.id)
      setPersons(filtered)
      setNotificationMessage({
        text: `${person.name} is deleted`,
        isError: false,
      })
      setTimeout(() => {
        setNotificationMessage(initialState)
      }, 5000)
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
      <Notification
        text={notificationMessage.text}
        isError={notificationMessage.isError}
      />
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
