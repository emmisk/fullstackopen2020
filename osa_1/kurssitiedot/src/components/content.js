import React from "react"
import Part from "./part"

const Content = ({ parts }) => {
  return (
    <div>
      <Part parts={parts[0]} />
      <Part parts={parts[1]} />
      <Part parts={parts[2]} />
    </div>
  )
}

export default Content
