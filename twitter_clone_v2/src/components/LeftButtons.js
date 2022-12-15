import React from 'react'
import {
  AiOutlineHome,
  AiOutlineBell,
  AiOutlineMail,
  AiOutlineUnorderedList
} from "react-icons/ai"
import { CiHashtag } from "react-icons/ci"
import { BsBookmark } from "react-icons/bs"
import { CgProfile } from "react-icons/cg"
import { SlPencil } from "react-icons/sl"
import { BiLogOut, BiLogOutCircle } from "react-icons/bi"


function LeftButtons({logout, showProfilePage, hideProfilePage}) {
  return (
    <div className="btn-wrapper">

    <div className="btn-left" onClick={logout}>
      <BiLogOutCircle className="btn-left-icon"></BiLogOutCircle>
      <div className="btn-left-text">Logout</div>
    </div>
    <div className="btn-left" onClick={hideProfilePage}>
      <AiOutlineHome className="btn-left-icon"></AiOutlineHome>
      <div className="btn-left-text">Home</div>
    </div>
    <div className="btn-left">
      <CiHashtag className="btn-left-icon"></CiHashtag>
      <div className="btn-left-text">Explore</div>
    </div>
    <div className="btn-left">
      <AiOutlineBell className="btn-left-icon"></AiOutlineBell>
      <div className="btn-left-text">Notifications</div>
    </div>
    <div className="btn-left">
      <AiOutlineMail className="btn-left-icon"></AiOutlineMail>
      <div className="btn-left-text">Messages</div>
    </div>
    <div className="btn-left">
      <BsBookmark className="btn-left-icon"></BsBookmark>
      <div className="btn-left-text">Bookmarks</div>
    </div>
    <div className="btn-left">
      <AiOutlineUnorderedList className="btn-left-icon"></AiOutlineUnorderedList>
      <div className="btn-left-text">Lists</div>
    </div>
    <div className="btn-left" onClick={showProfilePage}>
      <CgProfile className="btn-left-icon"></CgProfile>
      <div className="btn-left-text">Profile</div>
    </div>
    <div className="btn-left">
      <SlPencil className="btn-left-icon"></SlPencil>
      <div className="btn-left-text">Tweet</div>
    </div>
  </div>
  )
}

export default LeftButtons