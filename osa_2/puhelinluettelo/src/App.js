import React, { useState } from "react"
import Search from "./components/Search"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040 123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [findName, setFindName] = useState("")

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const sameName = persons.find(({ name }) => newName === name)
    if (sameName) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName("")
      setNewNumber("")
      setFindName("")
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFindChange = (event) => {
    setFindName(event.target.value)
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(findName.toLowerCase())
  )

  const personComponents = filteredPersons.map((person) => (
    <Search key={person.name} person={person} />
  ))

  return (
    <div className="container">
      <form onSubmit={addName}>
        <h1>Phonebook</h1>
        <div>Filter shown with:</div>
        <input value={findName} onChange={handleFindChange} />
        <h2>Add a new</h2>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number:{" "}
          <input
            type="tel"
            pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
            placeholder="123 123 1234"
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personComponents}
    </div>
  )
}

export default App
