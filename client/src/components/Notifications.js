import React, { Component } from "react"
import "../Notifications.css"
import Toggle from "./Toggle"
import openSocket from "socket.io-client"
const socket = openSocket("http://localhost:5000")

export default class Notifications extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: [],
      endPoint: "/endPoint",
      setting: null
    }
  }
  componentDidMount() {
    this.getData()
    this.fetchRepos()

  
  socket.on('notification', data => {
          console.log(data)
    })
  }
  getData() {
    socket.emit("sendData")
    socket.on("setSettings", data => {
      console.log(data, "from client")
      this.setState({ setting: data })
    })
  }

  async fetchRepos() {
    try {
      const response = await fetch("/api/repos")
      const json = await response.json()
      this.setState({ repos: json })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.repos.map((item, index) => {
            if (this.props.location.state.id === item.Organizations) {
              return (
                <li key={index}>
                  <h3>{item.repo}</h3>
                  {item.admin ? (
                    <Toggle
                      hook={item.hook}
                      belongsTo={item.repo}
                      repo={item.repo}
                      socketIo={socket}
                      setting={this.state.setting}
                    />
                  ) : (
                    <p>No promission allowed</p>
                  )}
                </li>
              )
            }
          })}
        </ul>
      </div>
    )
  }
}
