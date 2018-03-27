import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link, Redirect} from 'react-router-dom'
import * as actions from '../actions'
import { formatTimestamp } from '../utils/helpers'
import FaArrowCircleUp from 'react-icons/lib/fa/arrow-circle-up'
import FaArrowCircleDown from 'react-icons/lib/fa/arrow-circle-down'
import FaEdit from 'react-icons/lib/fa/edit'
import FaTimesCircle from 'react-icons/lib/fa/times-circle'

class PostList extends Component{

  state = {
    sortOrder: '',
  }
  componentDidMount(){
  }

  updateSortOrder(e){
    this.setState({ sortOrder: e.trim() })
  }

  clearSortOrder = () => {
    this.setState({sortOrder: ''})
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
    const { categoryUrl } = this.props
    const { sortOrder } = this.state

    let displayedPosts
    let catLabel
    let sortLabel

    if (categoryUrl && categoryUrl !== ''){
      catLabel = categoryUrl
      displayedPosts = posts.filter((post) => (post.category === categoryUrl && post.deleted !== true))
    }
    else {
      catLabel = 'all'
      displayedPosts = posts
    }

    if (sortOrder === '' || sortOrder === 'author'){
      displayedPosts = displayedPosts.sort((a,b) => {
        const aAuthor = a.author.toLowerCase(), bAuthor=b.author.toLowerCase()
        if (aAuthor < bAuthor)
         return -1
        if (aAuthor> bAuthor)
          return 1
        return 0
      })
      sortLabel = "author"
    }
    else if (sortOrder === 'voteScore'){
      displayedPosts = displayedPosts.sort((a,b) => (b.voteScore - a.voteScore))
      sortLabel = "most popular"
    }
    else if (sortOrder === 'timestamp'){
      displayedPosts = displayedPosts.sort((a,b) => (b.timestamp - a.timestamp))
      sortLabel = "most recent"
    }
    else {
      sortLabel = "author"
    }

    return (
      <div className="post-list-container">
        <div className="toolbar">
          <div className="categories">
            <div>Filter By:</div>
            <Link to={`/`}>
            <button key="all"
              className="btn-categories">All
            </button>
          </Link>
            {categories.map((category) => (
              <Link key={category.name} to={`/${category.name}`}>
                <button
                  className="btn-categories"
                  value={category.name}>{category.name}
                </button>
              </Link>
            ))}
          </div>
          <div className="sort-order">
            <div>Sort By:</div>
            <button
              className="btn-categories"
              value="author"
              onClick={(event) => this.updateSortOrder(`author`)}>By Author
            </button>
            <button
              className="btn-categories"
              value="timestamp"
              onClick={(event) => this.updateSortOrder(`timestamp`)}>Most Recent
            </button>
            <button
              className="btn-categories"
              value="votescore"
              onClick={(event) => this.updateSortOrder(`voteScore`)}>Most Popular
            </button>
          </div>
        </div>

        <div className="current-category">
          <h2 className="section-title">Currently looking at {catLabel} posts sorted by {sortLabel}:</h2>
        </div>
        <div className="post-list">
          {displayedPosts.map((post) => (
            <div className="post-details" key={post.id}>
              <div className="post-title">
                <Link to={`/${post.category}/${post.id}`}>
                  { post.title }</Link> by { post.author } on {formatTimestamp(`${post.timestamp}`)}
                  <Link to={`/${post.category}/${post.id}/edit`}>
                    <button className="btn-votes"><FaEdit size={20}/></button>
                  </Link>
              </div>
              <div className="post-category">Category: { post.category }</div>
              <div className="post-comment-count">Comments: { post.commentCount }</div>
              <div className="post-popularity]">Popularity: { post.voteScore }</div>
            <button className="btn-votes" onClick={(event => this.submitPostVote(`${post.id}`, 'upVote'))}><FaArrowCircleUp size={20}/></button>
            <button className="btn-votes" onClick={(event => this.submitPostVote(`${post.id}`, 'downVote'))}><FaArrowCircleDown size={20}/></button>
            <Link to={`/delete/${post.id}`}><button className="btn-votes"><FaTimesCircle size={20}/></button></Link>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ posts, categories }, { match }) {
  return {
    posts: posts,
    categories: categories,
    categoryUrl: match.params.category
  }
}

export default withRouter (connect(mapStateToProps, actions)(PostList))
