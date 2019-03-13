import React, { Component } from "react"
import Repos from "./repos"
import { Navbar, NavItem } from "react-materialize"
import "../Notifications.css"
import { Link } from "react-router-dom"
export default class displayRepos extends Component {
  constructor(props) {
    super(props)
    this._isMounted = false
  }
  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }
  render() {
    return (
      <React.Fragment>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"
        />
        <Navbar brand="logo" right>
          <NavItem onClick={() => console.log("test click")} />
          <Link to="/login">Back</Link>
        </Navbar>
        <Repos
          id={this.props.location.state.id}
          name={this.props.location.state.currentUser.username}
        />
      </React.Fragment>
    )
  }
}
