import "./App.css"
import { useState, useEffect } from "react"

function App() {
  const [color, setColor] = useState("")
  const [colorArr, setColorArr] = useState([])
  const [result, setResult] = useState(undefined) // can be right, wrong, or null

  function generateColor() {
    // generate a random color using rgb
    // return the random color
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)

    return `rgb(${r},${g},${b})`
  }

  useEffect(() => {
    const correctColor = generateColor()
    setColor(correctColor)

    // create an array with 3 colors. one of the colors being the correctColor.
    setColorArr([correctColor, generateColor(), generateColor()])
  }, [])

  const handleButtonClicked = (str) => {
    if (str === color) {
      setResult("right")
    } else {
      setResult("wrong")
    }
  }

  return (
    <div className="App">
      <div className="color-box" style={{ backgroundColor: color }}></div>
      Guess a color ---&gt;
      {colorArr
        ? colorArr.map((element, i) => {
            return (
              <button onClick={() => handleButtonClicked(element)} key={i}>
                {element}
              </button>
            )
          })
        : null}
      <div style={{ color: result === "right" ? "green" : "red" }}>
        {result}
      </div>
      <div>
        *** btw the color in the box is {color} "for debugging purposes"***
      </div>
      <button onClick={() => window.location.reload()}>New color</button>
    </div>
  )
}

export default App
