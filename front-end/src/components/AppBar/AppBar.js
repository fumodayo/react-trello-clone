import React from 'react'
import './AppBar.scss'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiInfoCircle, BiLogOutCircle, BiSearch } from 'react-icons/bi'
import { BsGrid3X3GapFill } from 'react-icons/bs'
import { FaRegBell, FaToriiGate } from 'react-icons/fa'
import { VscHome } from 'react-icons/vsc'

const AppBar = () => {
  return (
    <nav className="navbar-app">
      <div className="navbar-left">
        <button className="navbar-btn">
          <BsGrid3X3GapFill />
        </button>
        <button className="navbar-btn">
          <VscHome />
        </button>
        <button className="navbar-btn">
          <FaToriiGate />
          <span className="navbar-btn-text">Boards</span>
        </button>
        <div className="navbar-input">
          <input type="text" placeholder="Jump to..." />
          <span className="navbar-btn">
            <BiSearch />
          </span>
        </div>
      </div>
      <div className="navbar-right">
        <button className="navbar-btn">
          <AiOutlinePlus />
        </button>
        <button className="navbar-btn">
          <FaRegBell />
        </button>
        <button className="navbar-btn">
          <BiInfoCircle />
        </button>
        <img
          src="https://avatars.githubusercontent.com/thairyo"
          className="circle-image"
        />
        <button className="navbar-btn btn-red">
          <BiLogOutCircle />
          <span className="navbar-btn-text">Logout</span>
        </button>
      </div>
    </nav>
  )
}

export default AppBar
