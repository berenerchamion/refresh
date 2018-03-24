import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link} from 'react-router-dom'
import Modal from 'react-modal'
import { uuidv4} from '../utils/helpers'
import FaMehOIcon from 'react-icons/lib/fa/meh-o'
import FaSmileOIcon from 'react-icons/lib/fa/smile-o'

class Post extends Component{

  state = {
    modalIsOpen: false,
    postId: null
  }

  componentWillMount(){
    this.props.fetchPostComments(this.props.postId)
    Modal.setAppElement('body');
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

  submitComment = (e) => {
    e.preventDefault()
    if (!this.input.value){
      return
    }

    const commentData = {
      id: uuidv4(),
      parentId: this.props.postId,
      timestamp: Date.now(),
      body: this.input.value,
      author: "beren erchamion",
      voteScore: 0,
    }
    let url = "/" + this.props.category + "/" + this.props.postId
    this.props.addNewComment(commentData, () => this.props.history.push(url))
    this.closeModal()
  }

  openModal = () => {
    this.setState(() => ({
      modalIsOpen: true
    }))
  }

  afterOpenModal(){

  }

  closeModal = () => {
    this.setState(() => ({
      modalIsOpen: false,
      postId: null
    }))
  }

  render(){
    //State and props values
    const { posts } = this.props
    const { postId } = this.props
    const { modalIsOpen } = this.state

    //Mapping in values for collections
    let comments = this.props.comments[postId]
    let post = posts.filter((post) => (post.id === postId))

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
            <h2 className="section-title">Comments:</h2>
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
        <div className="add-comment">
          <button className="add-comment" onClick={this.openModal}>Add Comment</button>
        </div>
        <div className="comment-modal">
          <Modal
            className="modal"
            overlayClassName="overlay"
            isOpen={modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Modal"
            >
            <div className="comment-modal">
              <h3 className="comment-modal-header">Add Your Comment:</h3>
              <div className="comment-form">
                <input
                  className="comment-input"
                  type="text"
                  placeholder="Enter a comment..."
                  ref={(input) => this.input = input}
                  >
                </input>
              </div>
              <div className="comment-form-buttons">
                <button
                  className="comment-button"
                  onClick={this.submitComment}
                  >
                  <FaMehOIcon size={30}/>
                </button>
                <button
                  className="comment-button"
                  onClick={this.closeCommentModal}
                  >
                  <FaSmileOIcon size={30}/>
                </button>
              </div>
          </div>
          </Modal>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state, { match }) {
  return {
    posts: state.posts,
    postId: match.params.id,
    category: match.params.id,
    comments: state.comments
  }
}

export default connect(mapStateToProps, actions)(Post)
