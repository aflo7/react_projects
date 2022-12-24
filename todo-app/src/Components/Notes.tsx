import React, { useState, useEffect } from "react"
import { FaRegCircle } from "react-icons/fa"
import { AiOutlineDelete } from "react-icons/ai"

interface Task {
  content: string
  id: string
}

interface Folder {
  name: string
  tasks: Task[]
  count: number
}

interface NotesProps {
  selectedFolder: string
  addTask: (e: React.FormEvent<HTMLFormElement>, content: string) => void
  store: Folder[]
  createNewFolder: (
    e: React.FormEvent<HTMLFormElement>,
    folderName: string
  ) => void
  deleteTask: (id: string) => void
}

function Notes(props: NotesProps) {
  const { selectedFolder, addTask, store, createNewFolder, deleteTask } = props
  const [content, setContent] = useState("")
  const [tasks, setTasks] = useState<Task[]>([])
  const [folderName, setFolderName] = useState("")
  const [showNewTaskForm, setShowNewTaskForm] = useState(false)
  const [showAddTaskBtn, setShowAddTaskBtn] = useState(true)

  useEffect(() => {
    for (let i = 0; i < store.length; i++) {
      if (store[i].name === selectedFolder) {
        setTasks(store[i].tasks)
        break
      }
    }
  }, [selectedFolder, store])

  return (
    <div className="notes-wrapper">
      {selectedFolder === "New Folder" ? (
        <div className="form-wrapper">
          <form
            className="new-task-form"
            onSubmit={(e) => {
              createNewFolder(e, folderName)
              setFolderName("")
            }}
          >
            <input
              required
              className="folder-name-input"
              id="folder-name"
              name="folder-name"
              type={"text"}
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            ></input>
            <button type={"submit"} className="create-folder-btn">
              Create
            </button>
          </form>
        </div>
      ) : (
        <div className="form-wrapper">
          {showAddTaskBtn ? (
            <button
              className="add-task-btn"
              onClick={() => {
                setShowNewTaskForm((prev) => !prev)
                setShowAddTaskBtn((prev) => !prev)
              }}
            >
              <strong>+ </strong> Add a task
            </button>
          ) : null}

          {showNewTaskForm ? (
            <form
              className="new-task-form"
              onSubmit={(e) => {
                addTask(e, content)
                setContent("")
              }}
            >
              <input
                className="new-task-content-input"
                type="text"
                name="content"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <div className="new-task-btn-wrapper">
                <button type="submit" className="create-btn">
                  Add
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowNewTaskForm((prev) => !prev)
                    setShowAddTaskBtn((prev) => !prev)
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : null}
        </div>
      )}

      <div className="note-wrapper">
        <div>
          <strong>
            {selectedFolder !== "New Folder" ? selectedFolder : null}
          </strong>
        </div>
        {selectedFolder !== "New Folder" && tasks
          ? tasks.map((task: Task, i: number) => {
              return (
                <div className="single-note-wrapper" key={i}>
                  <div
                    className="single-note"
                    
                    
                  >
                    <div className="fa-reg-circle-wrapper">
                      <FaRegCircle className="fa-reg-circle" onClick={() => deleteTask(task.id)}/>
                    </div>
                    <div className="single-note-content">{task.content}</div>
                  </div>
                  <div className="single-note-delete-icon-wrapper">
                    <AiOutlineDelete className="single-note-delete-icon" onClick={() => deleteTask(task.id)}/>
                  </div>
                </div>
              )
            })
          : null}
      </div>
    </div>
  )
}

export default Notes
