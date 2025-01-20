import { useState } from 'react'

const StatisticLine = (props) => {
  return <tr>
    <td>
      {props.text} {props.value} {props.percent && "%"}
    </td>
  </tr>
}


const Statistics = (props) => {
  if (props.good == 0 && props.neutral == 0 && props.bad == 0) {
    return <p>No feedback is given</p>
  }

  let all = props.good + props.neutral + props.bad


  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={props.average / all} />
          <StatisticLine text="positive" value={(props.good * 100) / all} percent={true} />
        </tbody>

      </table>
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)


  const handleClick = (feedback, setFeedback, averageValue) => {
    setFeedback(feedback + 1)
    setAverage(average + averageValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => handleClick(good, setGood, 1)}>good</button>
      <button onClick={() => handleClick(neutral, setNeutral, 0)}>neutral</button>
      <button onClick={() => handleClick(bad, setBad, -1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} average={average} />
    </div>
  )
}

export default App

