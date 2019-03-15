import React, { Component } from "react"

import { Collapsible, CollapsibleItem, Button } from "react-materialize"

export default class notification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hookData: []
    }
    this._isMounted = false
    // this.renderData = this.render.bind(this)
    this.removeNotification = this.removeNotification.bind(this)
  }
  componentDidMount() {
    this._isMounted = true
    this.props.socket.on("notification", data => {
      console.log('notfication data:', data)
      console.log('hook data:', this.state.hookData)

      if (this._isMounted) {
        this.setState({
          hookData: this.state.hookData.concat(data)
        })
      }
    })
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  removeNotification (index) {
      this.state.hookData.splice(index, 1)
      this.setState({
        hookdata: this.state.hookData
      })
      console.log(this.state.hookData)
  }

  renderData() {
    console.log("asdzs")
    console.log(this.state.hookData)
    if (this.state.hookData.length > 0) {
      console.log("hook!")
      {
        return this.state.hookData.map((item, index) => 
            <li key={index}>
              <Collapsible>
              <Button onClick={() => this.removeNotification(index)}>Remove</Button>
                <CollapsibleItem header="New Notification " icon="whatshot">
                 
                <p>{item.time}</p>
                  <p className="info">repository: {item.repo}</p>
                  <p className="info">action: {item.action}</p>
                  <p className="info">from:{item.login}</p>
                </CollapsibleItem>
              </Collapsible>
            </li>
        )
      }
    } else {
      console.log("no hook")
      return null
    }
  }

  render() {
    return <ul><div>{this.renderData()}</div></ul>
  }
}
