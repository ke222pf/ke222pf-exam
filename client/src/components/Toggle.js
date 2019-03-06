import React, { Component } from "react"

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
