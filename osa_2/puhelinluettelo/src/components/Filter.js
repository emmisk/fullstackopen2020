import React from "react"

const Filter = ({ findPerson, handleFindChange }) => (
  <label>
    Filter shown with: <input value={findPerson} onChange={handleFindChange} />
  </label>
)

export default Filter
