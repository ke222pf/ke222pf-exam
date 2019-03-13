import React, { Component } from "react"
import { socketConnection } from "./socket"
import { Collapsible, CollapsibleItem, Chip, Tag } from "react-materialize"
const socket = socketConnection()
export default class notification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hookData: []
    }
    // this.renderData = this.render.bind(this)
  }
  componentDidMount() {
    socket.on("notification", data => {
        console.log(data)
        this.setState({ hookData: data })
      })
  }

  renderData() {
    console.log("asdzs")
    console.log(this.state.hookData)
    if (Object.entries(this.state.hookData).length > 0) {
      console.log("hook!")
      return (
        <div>
          <Collapsible>
            <CollapsibleItem header='Third' icon='whatshot'>
          <p>{this.state.hookData.action}</p>
          <p>{this.state.hookData.login}</p>
            </CollapsibleItem>
          </Collapsible>
        </div>
      )
    } else {
      console.log("no hook")
      return null
    }
  }

  render() {
    return <div>{this.renderData()}</div>
  }
}
