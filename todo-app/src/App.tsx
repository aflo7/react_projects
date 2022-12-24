import React, { useState, useEffect } from "react"
// import logo from './logo.svg';
import "./Styles/app.css"
import Nav from "./Components/Nav.jsx"
import Notes from "./Components/Notes.jsx"
import { AiOutlineMenu } from "react-icons/ai"
import { useMediaQuery } from "react-responsive"
import { BiNotepad } from "react-icons/bi"

interface Task {
  content: string
  id: string
}

interface Folder {
  name: string
  tasks: Task[]
  count: number
}

const defaultStore: Folder[] = [
  { name: "Quick Notes", tasks: [], count: 0 },
  { name: "Today", tasks: [], count: 0 },
  { name: "Next Week", tasks: [], count: 0 }
]

function App() {
  const [store, setStore] = useState<Folder[]>([])
  const [selectedFolder, setSelectedFolder] = useState("Quick Notes")
  const [showNav, setShowNav] = useState(true) // user can click the sandwhich button to show/hide the navbar

  // when the screen becomes larger than 700px, show the nav bar
  const showNav2 = useMediaQuery({
    minWidth: 700
  })

  useEffect(() => {
    const localStore = localStorage.getItem("Store")
    if (localStore == null) {
      localStorage.setItem("Store", JSON.stringify(defaultStore))
      setStore(defaultStore)
    } else {
      setStore(JSON.parse(localStore))
    }
  }, [])

  function addTask(e: React.FormEvent<HTMLFormElement>, content: string) {
    e.preventDefault()
    const newTask: Task = {
      content,
      id: crypto.randomUUID()
    }

    const tempStore = [...store]
    const folder = tempStore.find((folder) => folder.name === selectedFolder)
    if (folder === undefined) {
      return
    }
    folder.tasks.push(newTask)
    folder.count += 1
    setStore(tempStore)
  }

  function createNewFolder(
    e: React.FormEvent<HTMLFormElement>,
    folderName: string
  ) {
    e.preventDefault()
    const currStore = [...store]
    console.log(currStore)
    const exists = currStore.find((store) => store.name === folderName)
    if (exists !== undefined) {
      alert("Folder already exists")
      return
    }
    const newFolder: Folder = { name: folderName, count: 0, tasks: [] }
    currStore.push(newFolder)
    setStore(currStore)
  }

  function deleteTask(id: string) {
    console.log(id)
    const currStore = [...store]
    const folder = currStore.find((folder) => folder.name === selectedFolder)
    if (folder === undefined) {
      return
    }

    // find task with specific id, and delete it
    for (let i = 0; i < folder.tasks.length; i++) {
      if (folder.tasks[i].id === id) {
        folder.tasks.splice(i, 1)
        break
      }
    }
    setStore(currStore)
  }

  // whenever the store changes in state, change the store in localStorage
  useEffect(() => {
    localStorage.setItem("Store", JSON.stringify(store))
  }, [store])

  function handleSelectedFolderChange(folderName: string) {
    setSelectedFolder(folderName)
  }

  return (
    <div className="App">
      <div className="title">
        <div className="title-text">
          <BiNotepad className="title-icon" />
          <div className="title-text-inner">Todo App</div>
        </div>

        <AiOutlineMenu
          className="title-nav-icon"
          onClick={() => setShowNav((prev) => !prev)}
        />
      </div>
      <div className="bottom-wrapper">
        {showNav || showNav2 ? (
          <div className="nav-wrapper">
            <Nav
              selectedFolder={selectedFolder}
              store={store}
              setSelectedFolder={handleSelectedFolderChange}
            />
          </div>
        ) : null}

        <Notes
          selectedFolder={selectedFolder}
          store={store}
          addTask={addTask}
          createNewFolder={createNewFolder}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  )
}

export default App
