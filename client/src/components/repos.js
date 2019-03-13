import React, { Component } from "react"
import Toggle from "./Toggle"
import "../Notifications.css"
import { socketConnection } from "./socket"
const socket = socketConnection()

export default class repos extends Component {
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
    console.log("hejsan")
    console.log(this.props.name)
  }
  getData() {
    let currentUser = this.props.name
    socket.emit("sendData", currentUser)
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
            if (this.props.id === item.Organizations) {
              return (
                <div key={index}>
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
                </div>
              )
            }
          })}
        </ul>
      </div>
    )
  }
}
