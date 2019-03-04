import React, { Component } from "react"
// import { Navbar, NavItem } from 'react-materialize';
import LoginView from "./loginView"
import HomePage from "./HomePage"
export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      authenticate: false
    }
  }
  componentDidMount() {
    fetch("/api/currentUser")
      .then(res => res.json())
      .then(response => {
        this.setState({ authenticate: response })
        console.log(this.state.authenticate)
      })
      .catch(err => console.log(err))
  }
  render() {
    return this.state.authenticate ? <LoginView /> : <HomePage />
  }
}
