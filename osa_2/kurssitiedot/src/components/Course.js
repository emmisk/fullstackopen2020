import React from "react"
import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ course }) => {
  const partComponents = course.parts.map((part) => (
    <Content key={part.id} part={part} />
  ))

  return (
    <div>
      <Header course={course.name} />
      {partComponents}
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
