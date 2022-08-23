import React from 'react'
import './BoardBar.scss'
import { BiStar } from 'react-icons/bi'
import { FaToriiGate } from 'react-icons/fa'
import { MdKeyboardArrowDown, MdMoreHoriz } from 'react-icons/md'

const BoardBar = () => {
  return (
    <nav className="board-app">
      <div className="boardbar-left">
        <button className="boardbar-btn">
          <FaToriiGate />
          <span className="boardbar-btn-text">SonThai MERN Stack</span>
          <MdKeyboardArrowDown />
        </button>
        <div className="cut-btn"></div>
        <button className="boardbar-btn">#fullstack-trello-clone</button>
        <button className="boardbar-btn">
          <BiStar />
        </button>
        <div className="cut-btn"></div>
        <button className="boardbar-btn">
          <span className="boardbar-btn-text">Private workspace</span>
        </button>
        <div className="cut-btn"></div>
        <div className="boardbar-list-image">
          <img
            src="https://avatars.githubusercontent.com/thairyo"
            className="circle-image"
          />
          <img
            src="https://avatars.githubusercontent.com/thairyo"
            className="circle-image"
          />
          <img
            src="https://avatars.githubusercontent.com/thairyo"
            className="circle-image"
          />
          <img
            src="https://avatars.githubusercontent.com/thairyo"
            className="circle-image"
          />

        </div>
        <button className="boardbar-btn">Invite</button>
      </div>
      <div className="boardbar-right">
        <button className="boardbar-btn">
          <MdMoreHoriz />
          <span className="boardbar-btn-text">Show Menu</span>
        </button>
      </div>
    </nav>
  )
}

export default BoardBar
