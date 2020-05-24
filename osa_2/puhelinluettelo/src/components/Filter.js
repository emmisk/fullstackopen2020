import React from "react"

const Filter = ({ findName, handleFindChange }) => (
  <label>
    Filter shown with: <input value={findName} onChange={handleFindChange} />
  </label>
)

export default Filter
