import React from 'react'
import { Link } from 'react-router-dom'

const Nav = props => {
  const handleLogout = e => {
    e.preventDefault()
    // Remove the token from localstorage
    localStorage.removeItem('mernToken')
    // Update the state of the App
    props.updateUser();
  }

  let links = (
    <span>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
    </span>
  )

  if (props.user) {
    links = (
      <span>
        <li>Hello {props.user.firstname}!</li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </li>
      </span>
    )
  }


  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {links}
      </ul>
    </nav>
  )
}

export default Nav
