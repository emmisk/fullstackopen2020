import React, { useState } from "react"
import ReactDOM from "react-dom"

const Header = ({ header }) => (
  <div>
    <h1>{header}</h1>
  </div>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, all }) => {
  const average = (good - bad) / all || 0
  const positive = (good / all) * 100 || 0
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={all} />
          <StatisticLine text="Average" value={average.toFixed(2)} />
          <StatisticLine text="Positive" value={positive.toFixed(2)} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const header = "Give feedback"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad

  return (
    <div>
      <Header header={header} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h1>Statics</h1>
      {all ? (
        <Statistics good={good} neutral={neutral} bad={bad} all={all} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
