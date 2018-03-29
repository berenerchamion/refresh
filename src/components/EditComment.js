import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Redirect } from 'react-router-dom'

class EditComment extends Component{

  state = {
    commentId: ''
  }

  componentDidMount(){
    this.props.fetchPostComments(this.props.parentId)
  }

  editComment = e => {
    e.preventDefault()
    if (e.target.body.value === "" || e.target.author.value === ""){
      //Replace with a modal box
      alert("Hey, you need a title and author")
    }
    else {
      const commentData = {
        id: this.props.commentId,
        parentId: this.props.parentId,
        body: e.target.body.value,
      }
      this.props.editThisComment(commentData, () => this.props.history.push('/'))
    }
  }

  render(){
    const { commentId } = this.props
    const { parentId } = this.props
    const { comments } = this.props
    const { posts } = this.props

    let p = posts.filter((post) => (post.id === parentId))
    let postCategory = p[0].category

    if (!comments){
      let url = '/' + postCategory + '/' + parentId
      return (
        <Redirect to={{ pathname: url}}/>
      )
    }

    let comment = comments[parentId].filter((comment) => (comment.id === commentId))

    return (
        <div className="editCommentForm">
        <form onSubmit={this.editComment}>
          <h2>Edit Comment </h2>
          <ul className="form-style-1">
            <li>
              <label>Author</label>
              <input defaultValue={comment[0].author}  type="text" name="author" className="field-long" />
            </li>
            <li>
              <label>Comment:</label>
              <textarea defaultValue={comment[0].body} type="text" name="body" className="textArea">
              </textarea>
            </li>
            <button className="btn-categories">Update</button>
            <button className="btn-categories">Cancel</button>
          </ul>
        </form>
        </div>
    )
  }
}

function mapStateToProps(state, { match }) {
  return {
    posts: state.posts,
    commentId: match.params.id,
    parentId: match.params.parentId,
    comments: state.comments,
  }
}

export default connect(mapStateToProps, actions) (EditComment)
