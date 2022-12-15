import React from "react"
import "../styles/profile.css"
import { AiOutlineArrowLeft } from "react-icons/ai"

function Profile({ user, hide }) {
  return (
    <div>
      <div>
        <div className="profile-top-bar">
          <div className="left-arrow-profile-page" onClick={hide}>
            <AiOutlineArrowLeft/>
          </div>
        </div>
        <div className="profile-header-image"></div>
        <div className="profile-info">
          <div className="profile-pic"></div>
          <div className="profile-page-username">@{user}</div>
          <div className="profile-info-bottom-bar">
            <div className="profile-info-twt">Tweets</div>
            <div className="profile-info-likes">Likes</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
