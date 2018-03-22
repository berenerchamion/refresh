import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link } from 'react-router-dom'
import { uuidv4} from '../utils/helpers'

class DeletePost extends Component{

  deletePost = (postId) => {
    console.log("Deleting: " + postId)
    const postData = {
      id: postId
    }
    this.props.deleteThisPost(postData, () => this.props.history.push('/'))
  }

  render(){
    const { postId } = this.props
    console.log("render(): " + postId)
    return(
      <div className="container">
      <div className="confirm">Are you sure???</div>
      <div className="button"><button value="Delete Post" onClick={(event => this.deletePost(`${postId}`))}>Delete Post</button></div>
      </div>
    )
  }
}

function mapStateToProps(state, { match }){
  console.log("mapStateToProps: " + match.params.id)
  return {
    postId: match.params.id
  }
}

export default connect(mapStateToProps, actions) (DeletePost)
