import React from "react"
import App from "./App"
import Notfound from "./components/notFound"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Login from "./components/Authenticate"

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route component={Notfound} />
    </Switch>
  </BrowserRouter>
)

export default Router
