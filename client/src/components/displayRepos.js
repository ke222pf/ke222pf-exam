import React, { Component } from "react"
import Notifications from "./repos"
import { Navbar, NavItem } from "react-materialize"
import "../Notifications.css"
export default class displayRepos extends Component {
    constructor (props) {
        super(props)
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
          <NavItem onClick={() => console.log("test click")}>
            Notifications
          </NavItem>
          <NavItem href="/login">Back</NavItem>
        </Navbar>
        <Notifications id={this.props.location.state.id} name={this.props.location.state.currentUser.username}/>
      </React.Fragment>

    )
  }
}
