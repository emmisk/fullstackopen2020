import React from "react"

const Person = ({ person, removePerson }) => (
  <p>
    {person.name} {person.number}{" "}
    <button onClick={() => removePerson(person)}>Delete</button>
  </p>
)

export default Person
