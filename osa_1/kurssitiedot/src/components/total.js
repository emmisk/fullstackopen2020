import React from "react"

const Total = ({ parts }) => {
  const total = parts.reduce((acc, val) => acc + val.exercises, 0)
  return (
    <div>
      <p>Number of exercises: {total}</p>
    </div>
  )
}

export default Total
