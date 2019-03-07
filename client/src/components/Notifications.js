import React, { Component } from "react"
import "../Notifications.css"
import Toggle from "./Toggle"
import openSocket from "socket.io-client"
const socket = openSocket("http://localhost:5000")
export default class Notifications extends Component {
  constructor() {
    super()
    this.state = {
      repos: [],
      endPoint: "/endPoint",
      setting: null
    }
  }
  async componentDidMount() {
    socket.emit("sendData")
    socket.on("setSettings", data => {
      console.log(data, "from client")
      this.setState({ setting: data })
    })
    console.log(this.props.location.state.id)
    const response = await fetch("/api/repos")
    const json = await response.json()
    this.setState({ repos: json })
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <script src="//cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js" />
        <ul>
          {this.state.repos.map((item, index) => {
            if (this.props.location.state.id === item.Organizations) {
              return (
                <li key={index}>
                  <h3>{item.repo}</h3>
                  {
                    <Toggle
                      belongsTo={item.repo}
                      repo={item.repo}
                      socketIo={socket}
                      setting={this.state.setting}
                    />
                  }
                </li>
              )
            }
          })}
        </ul>
      </div>
    )
  }
}
