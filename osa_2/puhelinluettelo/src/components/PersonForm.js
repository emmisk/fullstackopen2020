import React from "react"

const PersonForm = ({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  addName,
}) => (
  <form onSubmit={addName}>
    <h2>Add a new</h2>
    <label>
      Name: <input value={newName} onChange={handleNameChange} />
    </label>
    <label>
      Number:{" "}
      <input
        type="tel"
        pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
        placeholder="123 123 1234"
        value={newNumber}
        onChange={handleNumberChange}
      />
    </label>
    <button type="submit">add</button>
  </form>
)

export default PersonForm
