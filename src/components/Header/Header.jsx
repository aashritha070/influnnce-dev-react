import React from "react"

import "./Header.css"

function Header() {
  return (
    <div className='header-wrapper'>
      <div className="headerTitle">
        <span className="headerTitleL">Influence</span>
        <span className="headerTitleS">impact it real</span>
      </div>
      {/* <img className="headerImg"  src={String(background)} alt="none"></img> */}
    </div>
  )
}

export default Header;