import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, withRouter, Link, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import * as actions from '../actions'

class PostList extends Component{

  state = {
    selectedCategory: ''
  }

  updateFilter = (e) => {
    this.setState({ selectedCategory: e.trim() })
  }

  clearFilter = () => {
    this.setState({selectedCategory: ''})
  }

  submitPostVote = (id, voteType) => {
    const postData = {
      id: id,
      voteType: voteType
    }
    this.props.voteForPost(postData)
    this.props.fetchAllPosts()
  }

  render() {
    const { posts } = this.props
    const { categories } = this.props
    const { selectedCategory } = this.state

    let displayedPosts
    let catLabel

    if (selectedCategory != ''){
      catLabel = selectedCategory
      displayedPosts = posts.filter((post) => (post.category === selectedCategory))
    }
    else{
      catLabel = 'all'
      displayedPosts = posts
    }

    console.log(selectedCategory)

    return (
      <div className="post-list-container">
        <div className="categories">
          <ul className="category-list">
            <button key="all" value="all" onClick={(event) => this.clearFilter()}>All</button>
            {categories.map((category) => (
              <button key={category.name} value={category.name}
                onClick={(event) => this.updateFilter(event.target.value)}>{category.name}</button>
            ))}
          </ul>
        </div>
        <div className="current-category">
          <h2 className="section-title">Currently looking at {catLabel} posts:</h2>
        </div>
        <div className="post-list">
          {displayedPosts.map((post) => (
            <li className="post-details" key={post.id} >
              <Link to={`/${post.category}/${post.id}`}>
                { post.title }</Link> by { post.author }
                <br/>
              Category: { post.category }<br/>
            Popularity: { post.voteScore }
            <button className="vote-button" onClick={(event => this.submitPostVote(`${post.id}`, 'upVote'))}>+</button>
            <button onClick={(event => this.submitPostVote(`${post.id}`, 'downVote'))}>-</button></li>
          ))}
        </div>
      </div>

    )
  }
}

function mapStateToProps({ posts, categories }) {
  return {
    posts: posts,
    categories: categories
  }
}

export default withRouter (connect(mapStateToProps, actions)(PostList))
