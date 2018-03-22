import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link, Redirect } from 'react-router-dom'
import Modal from 'react-modal'
import ReactDOM from 'react-dom'

class Post extends Component{

  state = {
    modalIsOpen: false,
    postId: null
  }

  submitPostVote = (id, voteType) => {
    const postData = {
      id: id,
      voteType: voteType
    }
    this.props.voteForPost(postData)
    this.props.fetchAllPosts()
  }

  submitCommentVote = (postId, commentId, voteType) => {
    const postData = {
      postId: postId,
      commentId: commentId,
      voteType: voteType
    }
    this.props.voteForComment(postData)
    this.props.fetchPostComments()
  }

  render(){
    const { posts } = this.props
    const { postId } = this.props

    var post = posts.filter((post) => (post.id === postId))

    return(
      <div className="post-container">
        {post.map((p) => (
          <div key={p.id} className="post-details">
            <div className="post-title">{p.title} - by - {p.author} - on {p.timestamp}</div>
            <div className="post-body">{ p.body }</div>
            <div className="post-votes">
                <div className="vote-buttons">Votes: { p.voteScore }
                  <button className="vote-button" onClick={(event => this.submitPostVote(`${p.id}`, 'upVote'))}>+</button>
                  <button className="vote-button" onClick={(event => this.submitPostVote(`${p.id}`, 'downVote'))}>-</button>
                </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state, { match }) {
  return {
    posts: state.posts,
    postId: match.params.id,
  }
}

export default connect(mapStateToProps, actions)(Post)
