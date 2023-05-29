import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DigitInput from './DigitInput'

function App() {

  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [hours, setHours] = useState(Math.floor(timeLeft / 3600))
  const [minutes, setMinutes] = useState(Math.floor(timeLeft % 3600 / 60))
  const [seconds, setSeconds] = useState(timeLeft - (hours * 3600 + minutes * 60))
  const [allocatedTime, setAllocatedTime] = useState(0)
  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        if (timeLeft > 0)
          setTimeLeft(+timeLeft - 1)
        setHours(Math.floor(+timeLeft / 3600))
        setMinutes(Math.floor(+timeLeft % 3600 / 60))
        setSeconds(+timeLeft - (hours * 3600 + minutes * 60))
        console.log(timeLeft)
      }, 1000);
      return () => clearInterval(timer)
    }

  })

  const red = 255 * timeLeft / allocatedTime
  return (
    <div className='wrapper' style={{ backgroundColor: `rgb(${255 - red},80,80)` }}>

      {!isRunning ?
        <div className='settings'>
          <DigitInput value={hours} updateValue={(value) => setHours(value)} /> <span>:</span>
          <DigitInput value={minutes} updateValue={(value) => setMinutes(value)} /><span>:</span>
          <DigitInput value={seconds} updateValue={(value) => setSeconds(value)} />
        </div>
        :
        <div className='display' style={{ display: "flex" }}>
          <p>{hours > 9 ? hours : `0${hours}`}:</p>
          <p>{minutes > 9 ? minutes : `0${minutes}`}:</p>
          <p>{seconds > 9 ? seconds : `0${seconds}`}</p>
        </div>}
      <div className='toggle'>
        <button onClick={toggleTimer}>{isRunning ? "Stop" : "Start"}</button>
      </div>
    </div>
  )
  function toggleTimer() {
    if (!isRunning) {
      const totalTime = hours * 3600 + minutes * 60 + seconds
      setTimeLeft(totalTime)
      setAllocatedTime(totalTime)
    }
    setIsRunning(prev => !prev)
  }

}
export default App
