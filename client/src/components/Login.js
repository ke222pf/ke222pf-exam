import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize';
export default class Login extends Component {
  render() {
    return (
      <React.Fragment>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"></link>
      <Navbar brand='logo' right>
      <NavItem onClick={() => console.log('test click')}>example something!</NavItem>
     <NavItem  href='/api/logout'>Logout</NavItem>
    </Navbar>
    </React.Fragment>
    )
  }
}
