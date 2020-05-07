import React from "react"

const Total = ({ parts }) => {
  const total = parts.reduce((acc, val) => acc + val.exercises, 0)
  return (
    <div>
      <b>Number of exercises: {total}</b>
    </div>
  )
}

export default Total
