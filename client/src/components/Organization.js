import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import "../Organization.css"
import {
  Card,
  CardTitle,
  Col,
  Collection,
  CollectionItem
} from "react-materialize"
import Toggle from "./Toggle"
import "../Notifications.css"

import { Fragment } from "react"
class organization extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orgs: [],
      repos: [],
      showInfo: false,
      item: null,
      user: ""
    }
    this._isMounted = false
  }
  componentDidMount() {
    this.fetchOrgs()
    this.fetchRepos()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  async fetchOrgs() {
    try {
      const response = await fetch("/api/orgs")
      const json = await response.json()
      this.setState({ orgs: json })
    } catch (e) {
      console.log(e)
    }
  }

  async fetchRepos() {
    try {
      const response = await fetch("/api/repos")
      const json = await response.json()
      this.setState({ repos: json })
    } catch (e) {
      console.log(e)
    }
  }
  renderRepos(item) {
    return this.state.repos.map((value, index) => {
      if (item.id === value.Organizations) {
        return (
          <div key={index}>
            <Collection>
              <CollectionItem>
                <b>{value.repo}</b>
              </CollectionItem>
              {/* <h3>{value.repo}</h3> */}

              <CollectionItem>
                {value.admin ? (
                  <Toggle
                    hook={value.hook}
                    belongsTo={value.repo}
                    repo={value.repo}
                    socketIo={this.props.socket}
                    user={this.props.currentUser.username}
                  />
                ) : (
                  <p>No promission allowed!</p>
                )}
              </CollectionItem>
            </Collection>
          </div>
        )
      }
    })
  }
  toggleInfo(info) {
    this.setState({ info: info })
    this.setState({ showInfo: !this.state.showInfo })
  }
  selectRender() {
    if (this.state.showInfo) {
      return this.renderRepos(this.state.info)
    }
  }
  render() {
    return (
      <Fragment>
        <div className="orgs">
          <ul>
            {this.state.orgs.map((item, index) => {
              return (
                <li key={index}>
                  <Col m={7} s={12}>
                    <Card
                      horizontal
                      header={<CardTitle image={item.img} />}
                      onClick={
                        () => this.toggleInfo(item)

                        // this.props.history.push("/settings", { id: item.id, currentUser: this.props.currentUser })
                      }
                    >
                      <h3>{item.Organizations}</h3>
                    </Card>
                  </Col>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="middle">{this.selectRender()}</div>
      </Fragment>
    )
  }
}

export default withRouter(organization)
