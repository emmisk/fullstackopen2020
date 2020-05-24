import React from "react"

const Search = ({ person }) => {
  return (
    <>
      <p>
        {person.name} {person.number}
      </p>
    </>
  )
}

export default Search
