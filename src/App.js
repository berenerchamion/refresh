import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, withRouter, Link, Switch } from 'react-router-dom'
import { fetchAllPosts, fetchAllCategories } from './actions'
import logo from './HOB_logo.png';
import './App.css';
import Post from './components/Post'
import PostList from './components/PostList'
import AddPost from './components/AddPost'
import DeletePost from './components/DeletePost'
import EditPost from './components/EditPost'
import EditComment from './components/EditComment'

class App extends Component{

  componentDidMount(){
    this.props.fetchAllPosts()
    this.props.fetchAllCategories()
  }

  render() {

    return (
      <div className="App">
        <div className="container">
            <header className="App-header">
              <div className="logo">
                <Link className="link-home" to={`/`}>
                  <img src={logo} className="App-logo" alt="logo" />
                </Link>
              </div>
                <div className="masthead">
                  <Link className="link-home" to={`/`}>
                    <h1 className="App-title">Welcome to Readable - a Nanodegree Project!</h1>
                  </Link>
                  <div className="btn-add-post">
                    <Link className="add-post" to={`/add`}>Create Post</Link>
                  </div>
                </div>
            </header>
          <div className="content">
            <Switch>
              <Route exact path="/" component={PostList} />
              <Route exact path="/add" component={AddPost} />
              <Route exact path="/delete/:id" component={DeletePost} />
              <Route exact path="/:category/:id" component={Post} />
              <Route exact path="/:category/:id/edit" component={EditPost} />
              <Route exact path="/editComment/:id/:parentId/" component={EditComment} />
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
