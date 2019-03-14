import React, { Component } from "react"
import { Navbar, NavItem, Dropdown } from "react-materialize"
import Organizations from "./Organization"
import "../LoginView.css"
import Notification from "./notification"
import openSocket from "socket.io-client"
const socketIo = openSocket("http://localhost:5000") 

export default class loginView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hookData: []
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar right>
          <NavItem onClick={() => console.log("test click")} />
          <NavItem href="/api/logout">Logout</NavItem>
        </Navbar>
        <div className="div-left">
          <Organizations currentUser={this.props.currentUser} socket={socketIo}/>
        </div>
        <div className="div-right">
          <Notification socket={socketIo}/>
        </div>
      </React.Fragment>
    )
  }
}
