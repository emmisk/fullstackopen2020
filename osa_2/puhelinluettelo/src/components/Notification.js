import React from "react"

const Notification = ({ text, isError }) => {
  const color = isError ? "#e22200" : "#319700"

  console.log(text)
  console.log(isError)

  if (text === null) {
    return null
  }
  const notificationStyle = {
    background: "#d9dbce",
    color: color,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  }

  return <div style={notificationStyle}>{text}</div>
}

export default Notification
