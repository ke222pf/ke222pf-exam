import React, { Component } from "react"
// const socket = openSocket("http://localhost:5000")

export default class Toggle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: this.checker()
    }
    // this.checker = this.checker.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    console.log(this.props.belongsTo, !this.state.checked)
    // this.setState({
    //   checked: this.checker()
    // })

    this.props.socketIo.emit("boolean", {
      boolean: !this.state.checked,
      belongs: this.props.repo
    })
  }
  checker() {
    let isChecked = false
    if (this.props.setting) {
      this.props.setting.forEach(element => {
        if (element.belongsTo === this.props.belongsTo) {
          console.log("hejsan")
          isChecked = element.bool
        }
      })
      console.log(isChecked, "is checked")
      return isChecked
    }
  }
  render() {
    return (
      <div>
        <label className="switch">
          <input
            type="checkbox"
            defaultChecked={this.checker()}
            onChange={this.handleChange}
          />
          <span className="slider round" />
        </label>
      </div>
    )
  }
}
