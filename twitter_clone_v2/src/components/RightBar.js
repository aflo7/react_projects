import React from "react"
import News from "./News"
import "../styles/rightbar.css"

function RightBar({ whoToFollow }) {
  return (
    <div className="rightbar">
      <div className="top-right">
        <News />
      </div>

      <div className="who-to-follow-wrapper">
        <div className="who-to-follow-title">Who to follow</div>
        <div>
          {whoToFollow
            ? whoToFollow.map((name, i) => {
                return <div className="individual-who-to-follow" key={i}>{name}</div>
              })
            : null}
        </div>
      </div>
    </div>
  )
}

export default RightBar
