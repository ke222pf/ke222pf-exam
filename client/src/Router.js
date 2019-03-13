import React from "react"
import App from "./App"
import Notifications from "./components/repos"
import displayRepos from "./components/displayRepos"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Login from "./components/Authenticate"

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/settings" component={displayRepos} />
    </Switch>
  </BrowserRouter>
)

export default Router
