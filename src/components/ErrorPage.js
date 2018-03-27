import React, { Component } from 'react';
import { Link} from 'react-router-dom'

class ErrorPage extends Component{

  render(){
    return(
      <div className="container">
      <div className="confirm"><h2>Are you being sneaky?</h2></div>
      <div className="button"><Link to={`/`}>Click Here to Go Home</Link></div>
      </div>
    )
  }
}

export default (ErrorPage)
