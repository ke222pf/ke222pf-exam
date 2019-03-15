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
import { checkMail } from "./checkEmail"
import openSocket from "socket.io-client"
const socketIo = openSocket("http://localhost:5000")

export default class loginView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hookData: [],
      email: "",
      toggel: true,
      haveMail: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.keyPress = this.keyPress.bind(this)
  }
  componentDidMount() {
    console.log(this.props.currentUser.username)
    this.checkifUserHaveInputMail()

  }
  handleChange(e) {
    this.setState({
      email: e.target.value
  })
  }

  checkifUserHaveInputMail () {
    checkMail(socketIo, setting => {
      this.setState({haveMail: setting})
      console.log(setting)
    })
  }

  keyPress(e) {
    if(this.state.haveMail === "NoEmail") {
      this.setState({haveMail: e.target.value})
      console.log(this.state.haveMail)
      let payLoad = {mail: this.state.email, user: this.props.currentUser.username}
      socketIo.emit("email", payLoad)
    } else {
      socketIo.emit('removeEmail', this.props.currentUser.username)
      this.setState({haveMail: "NoEmail"})
      console.log('remove')
    }
    console.log("asd")
  }

  render() {
    return (
      <React.Fragment>
        <Navbar brand="Github Dashboard" right>
          <NavItem href="/api/logout">Logout</NavItem>
          <SideNav
            trigger={<Button>Fill in Email for Notification</Button>}
            options={{ closeOnClick: true }}
          >
            <SideNavItem
              userView
              user={{
                img: <Icon>account_circle</Icon>,
              }}
            />
            <p className="wrapper">
            <h3>Github Dashboard</h3>
            <Icon>account_circle</Icon>
            <p className="username">{this.props.currentUser.username}</p>
            </p>
            {this.state.haveMail === "NoEmail" || "" ?
            <div>
              <input
                type="text"
                onChange={this.handleChange}/> <Button onClick={this.keyPress}> Accept</Button></div> : <p>{this.state.haveMail !== "" ? this.state.haveMail : this.state.email}<Button onClick={this.keyPress}>Remove my Email</Button></p>}
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
