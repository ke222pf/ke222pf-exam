import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import "../Organization.css"
import { Card, CardTitle, Col } from "react-materialize"
class organization extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orgs: []
    }

  }
  componentDidMount() {
    this.fetchOrgs()
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

  render() {
    return (
      <div>
        <ul>
          {this.state.orgs.map((item, index) => {
            return (
              <li key={index}>
                <Col m={7} s={12}>
                  <Card
                    horizontal
                    header={<CardTitle image={item.img} />}
                    onClick={() =>
                      this.props.history.push("/settings", { id: item.id, currentUser: this.props.currentUser })
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
    )
  }
}

export default withRouter(organization)
