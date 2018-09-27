import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar(props){
  return(
    <nav>
      <div className="nav-wrapper cyan darken-4">
        <a className="brand-logo left">Would You Rather</a>
        <ul id="nav-mobile" className="right">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/add'>New Question</Link></li>
          <li><Link to='/leaderboard'>Leaderboard</Link></li>
          <li><a >Logout</a></li>
        </ul>
      </div>
    </nav>
  )
}