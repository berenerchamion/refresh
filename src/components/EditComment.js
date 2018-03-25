import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  editComment = (e) => {
    e.preventDefault()
    if (e.target.body.value === "" || e.target.author.value === ""){
      //Replace with a modal box
      alert("Hey, you need a title and author")
    }
    else {
      const commentData = {
        id: this.props.commentId,
        title: e.target.author.value,
        body: e.target.body.value,
      }
      this.props.editThisComment(commentData, () => this.props.history.push('/'))
    }
  }

  render(){
    const { commentId } = this.props
    const { parentId } = this.props
    const { comments } = this.props

    console.log("commentId" + commentId)
    console.log ("parentId" + parentId)
    console.log("do I have crap??")
    console.log(this.props.comments)

    let comment = this.props.comments.filter((comment) => (comment.parentId === parentId))



    return (
        <div className="editCommentForm">
        <form onSubmit={this.editComment}>
          <h2>Edit Comment </h2>
          <ul className="form-style-1">
            <li>
              <label>Author</label>
              <input defaultValue="huh" type="text" name="author" className="field-long" />
            </li>
            <li>
              <label>Comment:</label>
              <textarea defaultValue="huh" type="text" name="body" className="textArea">
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
  console.log(state.comments)
  return {
    commentId: match.params.id,
    parentId: match.params.parentId,
    comments: state.comments,
  }
}

export default connect(mapStateToProps, actions) (EditComment)
