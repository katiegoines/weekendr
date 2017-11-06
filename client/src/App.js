import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css'
import clientAuth from './clientAuth'

import NavBar from './NavBar'

class App extends Component {
  state = {currentUser: null}

  componentDidMount() {
    this.setState({
      currentUser: clientAuth.getCurrentUser()
    })
  }

  onLoginSuccess(user) {
    this.setState({
      currentUser: clientAuth.getCurrentUser()
    })
  }

  logOut() {
    clientAuth.logOut()
    this.setState({
      currentUser: null
    })
  }

  render() {
    return (
      <div className="App">
        <NavBar currentUser={currentUser} />
      </div>
    );
  }
}

export default App;
