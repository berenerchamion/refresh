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

    render(){
      return(
        <div className="post-container">
        Hello there I am here!
        </div>
      )
    }

}

function mapStateToProps(state, { match }) {
  return {
    post: state.posts.filter((post) => (post.id === match.params.id)),
    postId: match.params.id,
  }
}

export default connect(mapStateToProps, actions)(Post)
