import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'

class DeletePost extends Component{

  deletePost = postId => {
    const postData = {
      id: postId
    }
    this.props.deleteThisPost(postData, () => this.props.history.push('/'))
  }

  render(){
    const { postId } = this.props
    return(
      <div className="container">
      <div className="confirm"><h2>Are you sure???</h2></div>
      <div className="button"><button className="btn-categories" value="Delete Post" onClick={(event => this.deletePost(`${postId}`))}>Delete Post</button></div>
      </div>
    )
  }
}

function mapStateToProps(state, { match }){
  return {
    postId: match.params.id
  }
}

export default connect(mapStateToProps, actions) (DeletePost)
