// Import packages
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

// Resources and custom components
import './App.css';
import Content from './content/Content'
import Footer from './nav/Footer'
import Header from './nav/Header'
import Nav from './nav/Nav'

const App = props => {
  // Declare state variables
  let [user, setUser] = useState(null)

  useEffect(() => {
    decodeToken()
  }, [])

  const updateUser = newToken => {
    if (newToken) {
      localStorage.setItem('mernToken', newToken);
      decodeToken(newToken);
    } else {
      setUser(null);
    }
  }

  const decodeToken = existingToken => {
    let token = existingToken || localStorage.getItem('mernToken');

    if (token) {
      let decoded = jwtDecode(token);

      // check for expired token or non valid or user is not logged in at all
      if (!decoded || Date.now() >= decoded.exp * 1000) {
        console.log("Token expired!!");
        setUser(null);
      } else {
        setUser(decoded);
      }
    } else {
      setUser(null);
    }
  }

  return (
    <Router>
      <div className="App">
        <Nav updateUser={updateUser} user={user} />
        <Header />
        <main>
          <Content updateUser={updateUser} user={user} />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
