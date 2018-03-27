import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link, Redirect } from 'react-router-dom'
import Modal from 'react-modal'
import { uuidv4} from '../utils/helpers'
import FaMehOIcon from 'react-icons/lib/fa/meh-o'
import FaSmileOIcon from 'react-icons/lib/fa/smile-o'
import FaArrowCircleUp from 'react-icons/lib/fa/arrow-circle-up'
import FaArrowCircleDown from 'react-icons/lib/fa/arrow-circle-down'
import FaTimesCircle from 'react-icons/lib/fa/times-circle'
import FaEdit from 'react-icons/lib/fa/edit'
import { formatTimestamp } from '../utils/helpers'

class Post extends Component{

  state = {
    modalIsOpen: false,
    postId: null,
  }

  componentWillMount(){
    this.props.fetchPostComments(this.props.postId)
    Modal.setAppElement('body');
  }

  submitPostVote = (postId, voteType) => {
    const postData = {
      id: postId,
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
  }

  submitComment = (e) => {
    e.preventDefault()
    if (!this.input.value || !this.author.value){
      alert("Author and a comment are required")
      return
    }

    const commentData = {
      id: uuidv4(),
      parentId: this.props.postId,
      timestamp: Date.now(),
      body: this.input.value,
      author: this.author.value,
      voteScore: 0,
    }
    let url = "/" + this.props.category + "/" + this.props.postId
    this.props.addNewComment(commentData, () => this.props.history.push(url))
    this.closeModal()
  }

  submitDeleteComment = (id, parentId) => {

    const commentData = {
      id: id,
      parentId: parentId,
    }
    let url = "/" + this.props.category + "/" + this.props.postId
    this.props.deleteThisComment(commentData, () => this.props.history.push(url))
    this.props.fetchPostComments(this.props.postId)
  }

  openModal = () => {
    this.setState(() => ({
      modalIsOpen: true
    }))
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

    if (!post || post.length === 0)
    {
      let url = '/error'
      return (
        <Redirect to={{ pathname: url}}/>
      )
    }

    return(
      <div className="post-container">
        {post.map((p) => (
          <div key={p.id} className="post-details">
            <div className="post-title">{p.title} - by - {p.author} - on {formatTimestamp(`${p.timestamp}`)}
              <Link to={`/${p.category}/${p.id}/edit`}>
                <button className="btn-votes"><FaEdit size={20}/></button>
              </Link>
            </div>
            <div className="post-body">{ p.body }</div>
            <div className="post-comments">Comments: { p.commentCount }</div>
            <div className="post-votes">Votes: { p.voteScore }
                <div className="vote-buttons">
                  <button className="btn-votes" onClick={(event => this.submitPostVote(`${p.id}`, 'upVote'))}><FaArrowCircleUp size={20}/></button>
                  <button className="btn-votes" onClick={(event => this.submitPostVote(`${p.id}`, 'downVote'))}><FaArrowCircleDown size={20}/></button>
                  <Link className="btn-delete-post" to={`/delete/${p.id}`}><FaTimesCircle size={20}/></Link>
                </div>
            </div>
          </div>
        ))}
        {comments &&
          <div className="post-comments">
            <h2 className="section-title">Comments: {comments.length}</h2>
            <ul className="comment-list">
              {comments.map((comment) => (
                <li key={comment.id} className="comment">Author: {comment.author} Votes: {comment.voteScore}<br/>
                  {comment.body}<Link to={`/editComment/${comment.id}/${comment.parentId}`}><button className="btn-votes"><FaEdit size={20}/></button></Link><br/>
                  <button className="btn-votes" onClick={(event => this.submitCommentVote(`${postId}`, `${comment.id}`, 'upVote'))}><FaArrowCircleUp size={20}/></button>
                  <button className="btn-votes" onClick={(event => this.submitCommentVote(`${postId}`, `${comment.id}`, 'downVote'))}><FaArrowCircleDown size={20}/></button>
                  <button className="btn-votes" onClick={(event => this.submitDeleteComment(`${comment.id}`, `${postId}`))}><FaTimesCircle size={20}/></button>
                  <br/>
                </li>
              ))}
            </ul>
          </div>
        }
        <div className="add-comment">
          <button className="btn-comment-add" onClick={this.openModal}>Add Comment</button>
        </div>
        <div className="comment-modal">
          <Modal
            className="modal"
            overlayClassName="overlay"
            isOpen={modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="CommentModal"
            >
            <div className="comment-modal">
              <h3 className="comment-modal-header">Add Your Comment:</h3>
              <div className="comment-form">
                <input
                  className="comment-input"
                  type="text"
                  placeholder="Enter your name..."
                  ref={(author) => this.author = author}
                  >
                </input>
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
                  className="btn-comment-add"
                  onClick={this.submitComment}
                  >
                  <FaSmileOIcon size={40}/>
                </button>
                <button
                  className="btn-comment-cancel"
                  onClick={this.closeModal}
                  >
                  <FaMehOIcon size={40}/>
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
    comments: state.comments,
  }
}

export default connect(mapStateToProps, actions)(Post)
