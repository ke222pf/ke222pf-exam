import React from "react"
import App from "./App"
import Notifications from "./components/Notifications"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Login from "./components/Authenticate"
console.log("är i routes")
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/settings" component={Notifications} />
    </Switch>
  </BrowserRouter>
)

export default Router
