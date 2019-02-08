import React from 'react'
import App from './App'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/Login'
console.log('är i routes')
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/login' component={Login} />
    </Switch>
  </BrowserRouter>
)

export default Router
