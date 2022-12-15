import React from "react"

function Login({userInput, setUserInput, login}) {
  return (
    <div className="login-wrapper">
      <label htmlFor="user">User: </label>
      <input
        type="text"
        id="user"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      ></input>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login
