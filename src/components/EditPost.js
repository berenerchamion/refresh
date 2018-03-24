import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Redirect } from 'react-router-dom'

class EditPost extends Component{

  state = {
    postId: ''
  }

  editPost = (e) => {
    e.preventDefault()
    if (e.target.body.value === "" || e.target.title.value === ""){
      //Replace with a modal box
      alert("Hey, you need a title and body")
    }
    else {
      const postData = {
        id: this.props.postId,
        title: e.target.title.value,
        body: e.target.body.value,
      }
      this.props.fetchAllPosts()
      this.props.submitEdit(postData, () => this.props.history.push('/'))
    }
  }

  render(){
    const { posts } = this.props
    const { postId } = this.props
    let p = posts.filter((post) => (post.id === postId))

    if (!p[0].id){
      return (
        <Redirect to={{ pathname: '/'}}/>
      )
    }

    return (
        <div className="editForm">
          <form onSubmit={this.editPost}>
            <h2>Edit Post {p[0].id}</h2>
            <ul className="form-style-1">
              <li>
                <label>Title</label>
                <input defaultValue={p[0].title} type="text" name="title" className="field-long" />
              </li>
              <li>
                <label>Content/Body:</label>
                <textarea defaultValue={p[0].body} type="text" name="body" className="textArea">
                </textarea>
              </li>
              <button>Update</button>
              <button>Cancel</button>
            </ul>
          </form>
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

export default connect(mapStateToProps, actions) (EditPost)
