import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, withRouter, Link, Switch } from 'react-router-dom'

class PostList extends Component{

  render() {
    const { posts } = this.props

    return (
      <div className="post-list">
        {posts.map((post) => (
          <li className="post-details" key={post.id} >
            <Link to={`/${post.category}/${post.id}`}>
              { post.title }</Link> by { post.author }
              <br/>
            Category: { post.category }<br/>
          Popularity: { post.voteScore }</li>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: posts
  }
}

export default withRouter (connect(mapStateToProps)(PostList))
