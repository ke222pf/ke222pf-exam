import React, { Component } from "react"
import {
  Navbar,
  NavItem,
  SideNav,
  SideNavItem,
  Button,
  Input,
  Row,
  Icon
} from "react-materialize"
import Organizations from "./Organization"
import "../LoginView.css"
import Notification from "./notification"
import openSocket from "socket.io-client"
const socketIo = openSocket("http://localhost:5000")

export default class loginView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hookData: [],
      email: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.keyPress = this.keyPress.bind(this)
  }

  handleChange(e) {
    this.setState({
      email: e.target.value
  })
  }

  keyPress(e) {
    let payLoad = {mail: this.state.email, user: this.props.currentUser.username}
      socketIo.emit("email", payLoad)
    console.log("asd")
  }

  render() {
    return (
      <React.Fragment>
        <Navbar right>
          <NavItem onClick={() => console.log("test click")} />
          <NavItem href="/api/logout">Logout</NavItem>
          <SideNav
            trigger={<Button>Fill in Email for Notification</Button>}
            options={{ closeOnClick: true }}
          >
            <SideNavItem
              userView
              user={{
                background: "img/office.jpg",
                image: "img/yuna.jpg",
                name: this.props.currentUser.username
              }}
            />
              <input
                type="text"
                onChange={this.handleChange}
              />
              <Button onClick={this.keyPress}> Accept </Button>
          </SideNav>
        </Navbar>
        <div className="div-left">
          <Organizations
            currentUser={this.props.currentUser}
            socket={socketIo}
          />
        </div>
        <div className="div-right">
          <Notification socket={socketIo} />
        </div>
      </React.Fragment>
    )
  }
}
