import React, { Component, Fragment } from "react"

import { Collapsible, CollapsibleItem, Button } from "react-materialize"

export default class notification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hookData: [],
      firstTime: false
    }
    this._isMounted = false
    this.removeNotification = this.removeNotification.bind(this)
  }
  componentDidMount() {
    this._isMounted = true
    this.fetchUnreadNotification()
    this.props.socket.on("notification", data => {

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
      this.setState({firstTime: false})
      console.log(this.state.hookData)
  }

  async fetchUnreadNotification () {
    const response = await fetch("/api/getNotifications")
      const json = await response.json()
      this.setState({
        hookData: this.state.hookData.concat(json)
      })
      this.setState({firstTime: true})
      console.log(this.state.unReadNotification)
  }

  renderData() {
    console.log(this.state.hookData)
    if (this.state.hookData.length > 0) {
        return this.state.hookData.map((item, index) => 
        <li key={index}>
              <Collapsible>
              <Button onClick={() => this.removeNotification(index)}>Remove</Button>
                <CollapsibleItem header={item.sinceLastTime  === false ? "Since last time": "New Notification"} icon="whatshot">
                 
                <p>{item.time}</p>
                  <p className="info">repository: {item.repo}</p>
                  <p className="info">action: {item.action}</p>
                  <p className="info">from:{item.login}</p>
                </CollapsibleItem>
              </Collapsible>
            </li>
        )
    } else {
      console.log("no hook")
      return null
    }
  }

  render() {
    return  <Fragment><ul><div>{this.renderData()}</div></ul></Fragment>
  }
}
