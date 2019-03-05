import React, { Component } from "react"

export default class Notifications extends Component {
  constructor() {
    super()
    this.state = {
      repos: []
    }
  }
  async componentDidMount() {
    console.log(this.props.location.state)
    const response = await fetch('/api/repos')
    const json = await response.json()

  }

  render() {
    return <div />
  }
}
