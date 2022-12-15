import "./App.css"
import { useState, useEffect } from "react"

class Word {
  constructor(word, def) {
    this.word = word
    this.def = def
  }
}

function App() {
  const [currentWord, setCurrentWord] = useState("")
  const [def, setDef] = useState("")
  const [example, setExample] = useState("")
  const [wordBank, setWordBank] = useState([])

  // grab whatever is highlighted and search with API
  function getSelectionText() {
    var text = ""
    if (window.getSelection) {
      text = window.getSelection().toString()
    } else if (document.selection && document.selection.type !== "Control") {
      text = document.selection.createRange().text
    }
    if (!text) {
      return
    }

    // if all characters are letters...
    if (/^[a-zA-Z]+$/.test(text)) {
      // lookup the word and store the result
      fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + text)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data[0].meanings[0].definitions)
          if (data[0].meanings[0].definitions.length > 0) {
            setCurrentWord(text)
            setDef(data[0].meanings[0].definitions[0].definition)
            setExample(data[0].meanings[0].definitions[0].example)

            setWordBank((wordBank) => [
              ...wordBank,
              new Word(text, data[0].meanings[0].definitions[0].definition)
            ])
          }
        })
    }
  }

  // when pasting into the first text box, remove any formatting
  const removeFormatting = (e) => {
    e.preventDefault()
    var text = e.clipboardData.getData("text/plain")
    document.execCommand("insertHTML", false, text)
  }

  return (
    <div>
      <div className="text-area-wrapper">
        <div
          contentEditable="true"
          onDoubleClick={getSelectionText}
          className="text-area"
          onPaste={(e) => removeFormatting(e)}
          // onInput={(e) => createWordArr(e)}
        ></div>
      </div>

      <div className="word-definition-wrapper">
        <div>
          <strong>{currentWord}</strong>
        </div>
        <div>{def ? `Meaning: ${def}`:null}</div>
        <div className="word-example-sentence">{example ? `Sentence: ${example}`:null}</div>
      </div>
      <div className="word-bank-wrapper">
        <div className="word-bank-title">Word bank</div>
        <div className="word-bank-words">
          {wordBank &&
            wordBank.map((element, i) => {
              return (
                <div className="word-box">
                  <div key={i}>
                    <u>{element.word}</u>:{" "}
                  </div>
                  <div>{element.def}</div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default App

// When they arrived at Brunswick-square they found, gathered upon the steps, a little crowd of people.
