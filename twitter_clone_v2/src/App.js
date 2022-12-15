import "./App.css"
import { useState } from "react"
import Profile from "./components/Profile"
import { userData } from "./data/data"
import RightBar from "./components/RightBar"
import LeftButtons from "./components/LeftButtons"
import Login from "./components/Login"

function App() {
  const [currentUser, setCurrentUser] = useState("")
  const [userInput, setUserInput] = useState("")
  const [tweets, setTweets] = useState([])
  const [showTweets, setShowTweets] = useState(true)
  const [showProfile, setShowProfile] = useState(false)
  const [whoToFollow, setWhoToFollow] = useState([])

  const login = () => {
    if (userInput === "" || !(userInput in userData)) {
      return
    }
    setCurrentUser(userInput)
    let tweetsToDisplay = []

    // display self tweets
    userData[userInput].tweets.forEach((tweet) => {
      tweetsToDisplay.push({ tweet: tweet, author: userInput })
    })

    // display the tweets of the people you are following
    userData[userInput].following.forEach((user) => {
      userData[user].tweets.forEach((tweet) => {
        tweetsToDisplay.push({ tweet: tweet, author: user })
      })
    })
    setTweets(tweetsToDisplay)

    // find people you are NOT following
    let allUserData = {...userData}
    let following = userData[userInput].following

    //traverse this, check if each element in allUserData
    following.forEach(x => {

      // if so, get rid of that person
      if (allUserData.hasOwnProperty(x)) {
        delete allUserData[x]
      }
    })

    // get rid of yourself
    delete allUserData[userInput]
    setWhoToFollow(Object.keys(allUserData))
  }

  const logout = () => {
    setCurrentUser("")
    setTweets([])
    setShowTweets(true)
    setShowProfile(false)
    setWhoToFollow([])
  }

  const showProfilePage = () => {
    setShowProfile(true)
    setShowTweets(false)
  }

  const hideProfilePage = () => {
    setShowProfile(false)
    setShowTweets(true)
  }

  // wait until I can add a database
  // const createTweet = (text) => {

  // }

  return (
    <>
      {currentUser ? (
        <div className="main-wrapper">
          <div className="left-sidebar">
            <div className="left-sidebar-inner">
              <LeftButtons
                logout={logout}
                showProfilePage={showProfilePage}
                hideProfilePage={hideProfilePage}
              />
            </div>
          </div>
          <div className="middle">
            <div className="top-middle">
              <input
                className="tweet-input"
                type={"text"}
                placeholder="What's on your mind?"
              ></input>
              <input
                className="send-tweet"
                type={"submit"}
                value="Tweet"
              ></input>
            </div>
            {tweets && showTweets
              ? tweets.map((tweet, i) => {
                  return (
                    <div className="tweet-wrapper" key={i}>
                      <div>{tweet.tweet}</div>
                      <div className="tweet-author">{tweet.author}</div>
                    </div>
                  )
                })
              : null}

            {showProfile ? (
              <Profile user={currentUser} hide={hideProfilePage} />
            ) : null}
          </div>

          <div className="right-sidebar">
            <RightBar whoToFollow={whoToFollow}/>
          </div>
        </div>
      ) : (
        <Login
          userInput={userInput}
          setUserInput={setUserInput}
          login={login}
        />
      )}
    </>
  )
}

export default App
