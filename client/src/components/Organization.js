import React, { Component } from "react"
import {withRouter} from "react-router-dom"
import "../Organization.css"
import { Card, CardTitle, Col } from "react-materialize"
class organization extends Component {
  constructor() {
    super()
    this.state = {
      orgs: []
    }
  }
  async componentDidMount() {
    const response = await fetch("/api/orgs")
    const json = await response.json()
    this.setState({ orgs: json })
    // console.log(this.state)
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
                    header={<CardTitle image={item.img}/>}
                    // actions={[<a key={index}href="/settings">Subscribe a hook for a repo</a>]}
                    onClick={() => this.props.history.push("/settings", { id: item.id})}
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
