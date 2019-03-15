import React, { Fragment } from "react"
import img from '../github.png'
import {
  Button,
} from "react-materialize"

const homePage = () => {
   
  return( 
    <Fragment>
    <img className="loggo" src={img} alt="GitHub loggo"></img>
  <Button><a className="link" href="/api/login/github">Log in with Github</a></Button>
  </Fragment>
  )
}

export default homePage
