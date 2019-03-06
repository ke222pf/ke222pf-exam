import React, { Component } from "react"
import "../Notifications.css"
import Toggle from "./Toggle"
export default class Notifications extends Component {
  constructor() {
    super()
    this.state = {
      repos: [],
      checked: false
    }
  }
  async componentDidMount() {
    console.log(this.props.location.state.id)
    const response = await fetch("/api/repos")
    const json = await response.json()
    this.setState({ repos: json })
    console.log(this.state)
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
                  {
                    <Toggle belongsTo={item.repo}/>
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
