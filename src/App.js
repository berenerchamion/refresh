import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, withRouter, Link, Switch } from 'react-router-dom'
import { fetchAllPosts, fetchAllCategories } from './actions'
import logo from './logo.svg';
import './App.css';
import Post from './components/Post'
import PostList from './components/PostList'

class App extends Component{

  componentDidMount(){
    this.props.fetchAllPosts()
    this.props.fetchAllCategories()
  }

  render() {
    const { posts } = this.props

    return (
      <div className="App">
        <div className="container">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Readable - a Nanodegree Project!</h1>
          </header>
          <div className="content">
            <Switch>
              <Route exact path="/" component={PostList} />
              <Route exact path="/:category/:id" component={Post} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: posts
  }
}

export default withRouter (connect(mapStateToProps, { fetchAllPosts, fetchAllCategories })(App))
