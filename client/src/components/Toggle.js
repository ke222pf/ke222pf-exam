import React, { Component } from "react"
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000')

export default class Toggle extends Component {
    constructor(props) {
      super(props) 

      this.state = {
        checked: true
      }
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange() {
      console.log(this.props.belongsTo, this.state.checked)
      this.setState({
          checked: !this.state.checked
      })

      socket.emit('boolean', this.state.checked)
    }
  render() {
    return (
      <div>
        <label className="switch">
          <input type="checkbox" onChange={this.handleChange} />
          <span className="slider round" />
        </label>
      </div>
    )
  }
}
