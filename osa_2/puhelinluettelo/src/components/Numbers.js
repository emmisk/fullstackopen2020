import React from "react"
import Person from "./Person"

const Numbers = ({ filteredPersons }) => {
  const personComponents = filteredPersons.map((person) => (
    <Person key={person.name} person={person} />
  ))

  return (
    <>
      <h2>Numbers</h2>
      {personComponents}
    </>
  )
}

export default Numbers
