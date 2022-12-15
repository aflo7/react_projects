import "./App.css"
import { useState, useEffect } from "react"
import Algos from "./components/Algos"

function App() {
  const [arr, setArr] = useState([5, 4, 3, 2])
  const [arrStates, setArrStates] = useState(null)
  const [currentArr, setCurrentArr] = useState([5,4,3,2])

  const handleStateChange = (array) => {
    setArrStates(array)
  }

  useEffect(() => {
    if (arrStates !== null) {
      arrStates.forEach((array, i) =>
        setTimeout(() => {
          setCurrentArr(array)
        }, (i + 1) * 1200)
      )
    }
  }, [arrStates])

  const reset = ()=> {
    setCurrentArr([5,4,3,2])
    setArrStates(null)
  }

  return (
    <div className="App">
      <div className="array-wrapper">
      {currentArr}
      </div>
      {/* <Bubble sendArr={handleStateChange} arr={arr} />
      <Insertion sendArr={handleStateChange} arr={arr}/> */}
      <Algos sendArr={handleStateChange} arr={arr}/>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default App
