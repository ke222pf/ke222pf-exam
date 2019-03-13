import React, { Component } from "react"

export default class Toggle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: this.checker(),
      user: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }
componentDidMount() {
this.getUser()
}
 handleChange() {
    this.setState({
      checked: !this.state.checked
    })
    console.log(this.props.belongsTo, !this.state.checked)

    this.props.socketIo.emit("boolean", {
      boolean: !this.state.checked,
      belongs: this.props.repo,
      hook: this.props.hook,
      username: this.state.user
    })
  }
  async getUser() {
    const response = await fetch("/api/currentUser")
    const json = await response.json()
    console.log(json)
    this.setState({user: json.username})

    return json.username
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
