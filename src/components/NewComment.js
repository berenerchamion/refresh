import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link } from 'react-router-dom'
import { uuidv4} from '../utils/helpers'

class NewComment extends Component{

  submitPost = (e) => {
    e.preventDefault()
    const postData = {
      id: uuidv4(),
      timestamp: Date.now(),
    }
    this.props.addNewComment(postData, () => this.props.history.push('/'))
  }

  render(){

    return(
      <div className="container">
        Here is my container for the modal! 
      </div>
    )
  }
}

function mapStateToProps(state, { match }){
  return {

  }
}

export default connect(mapStateToProps, actions) (NewComment)
