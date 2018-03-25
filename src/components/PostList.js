import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import * as actions from '../actions'
import EditPost from './EditPost'
import { formatTimestamp } from '../utils/helpers'
import FaArrowCircleUp from 'react-icons/lib/fa/arrow-circle-up'
import FaArrowCircleDown from 'react-icons/lib/fa/arrow-circle-down'
import FaEdit from 'react-icons/lib/fa/edit'

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

    if (selectedCategory !== ''){
      catLabel = selectedCategory
      displayedPosts = posts.filter((post) => (post.category === selectedCategory && post.deleted != true))
    }
    else{
      catLabel = 'all'
      displayedPosts = posts
    }
    return (
      <div className="post-list-container">
        <div className="categories">
          <ul className="category-list">
            <button key="all" className="btn-categories" value="all" onClick={(event) => this.clearFilter()}>All</button>
            {categories.map((category) => (
              <button key={category.name} className="btn-categories" value={category.name}
                onClick={(event) => this.updateFilter(event.target.value)}>{category.name}</button>
            ))}
          </ul>
        </div>
        <div className="current-category">
          <h2 className="section-title">Currently looking at {catLabel} posts:</h2>
        </div>
        <div className="post-list">
          {displayedPosts.map((post) => (
            <div className="post-details" key={post.id}>
              <div className="post-title">
                <Link to={`/${post.category}/${post.id}`}>
                  { post.title }</Link> by { post.author } on {formatTimestamp(`${post.timestamp}`)}
                    <Link className="btn-votes" to={`/${post.category}/${post.id}/edit`}><FaEdit size={20}/></Link>
              </div>
              <div className="post-category">Category: { post.category }</div>
              <div className="post-popularity]">Popularity: { post.voteScore }</div>
            <button className="btn-votes" onClick={(event => this.submitPostVote(`${post.id}`, 'upVote'))}><FaArrowCircleUp size={20}/></button>
            <button className="btn-votes" onClick={(event => this.submitPostVote(`${post.id}`, 'downVote'))}><FaArrowCircleDown size={20}/></button><br/>
            </div>
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
