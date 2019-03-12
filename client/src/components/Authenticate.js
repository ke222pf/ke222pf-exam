import React, { Component } from "react"
// import { Navbar, NavItem } from 'react-materialize';
import LoginView from "./loginView"
import HomePage from "./HomePage"
export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      authenticate: false,
      user: ""
    }
  }
  async componentDidMount() {
    try {
    const response = await fetch("/api/currentUser")
    const json = await response.json()
    this.setState({user: json})
    console.log(json)
    this.setState({ authenticate: json })
  }
  catch(e) {
    console.log(e)
  }
  }
  render() {
    return this.state.authenticate ? <LoginView currentUser={this.state.user}/> : <HomePage />
  }
}
