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

  componentWillMount(){
    this.props.fetchPostComments(this.props.postId)
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
    let comments = this.props.comments[postId]

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
            <div className="post-delete"><Link className="delete-post" to={`/delete/${p.id}`}>Delete Me!</Link></div>
          </div>
        ))}
        {comments &&
          <div className="post-comments">
            <h2 className="section-title">Comments: </h2>
            <ul className="comment-list">
              {comments.map((comment) => (
                <li key={comment.id} className="comment">{comment.author} Votes: {comment.voteScore}
                  <button className="vote-button" onClick={(event => this.submitCommentVote(`${postId}`, `${comment.id}`, 'upVote'))}>+</button>
                  <button onClick={(event => this.submitCommentVote(`${postId}`, `${comment.id}`, 'downVote'))}>-</button>
                  <br/>
                {comment.body} </li>
              ))}
            </ul>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state, { match }) {
  return {
    posts: state.posts,
    postId: match.params.id,
    comments: state.comments
  }
}

export default connect(mapStateToProps, actions)(Post)
