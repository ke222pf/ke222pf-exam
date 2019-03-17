import React, { Component } from "react"
import { toggelData } from "./toggelData"
export default class Toggle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bool: this.checker()
    }
    this.handleChange = this.handleChange.bind(this)
    console.log("asd")
  }

  handleChange() {
    this.setState({
      bool: !this.state.bool,
    })
    console.log(!this.state.setting)
    console.log(this.props.belongsTo, !this.state.bool)
    console.log(this.props.user)
    this.props.socketIo.emit("boolean", {
      belongs: this.props.repo,
      boolean: !this.state.bool,
      hook: this.props.hook,
      username: this.props.user
    })

    this.props.socketIo.emit("hookSettings", {
      boolean: !this.state.bool,
      hook: this.props.hook,
      belongs: this.props.repo,
      hook: this.props.hook,
      username: this.props.user
    })
  }

  checker() {
    toggelData(this.props.socketIo, this.props.user, settings => {
      console.log(settings)

      let isChecked = false
      if (settings.length) {
        settings.forEach(element => {
          if (element.belongsTo === this.props.belongsTo) {
            isChecked = element.bool
          }
        })
      }
      this.setState(() => ({ bool: isChecked }))
    })
  }

  render() {
    return (
      <div>
        <p>Set up Hook</p>
        <label className="switch">
          <input
            type="checkbox"
            defaultChecked={this.state.bool}
            onClick={this.handleChange}
          />
          <span className="slider round" />
        </label>
      </div>
    )
  }
}
