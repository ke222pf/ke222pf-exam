import React from "react"
import { Navbar, NavItem } from "react-materialize"
import Organizations from "./Organization"
import "../LoginView.css"

const loginView = () => {
  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"
      />
      <Navbar brand="logo" right>
        <NavItem onClick={() => console.log("test click")}>
          Notification Settings
        </NavItem>
        <NavItem href="/api/logout">Logout</NavItem>
      </Navbar>
      <Organizations />
    </React.Fragment>
  )
}

export default loginView
