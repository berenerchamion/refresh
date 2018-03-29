import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { uuidv4 } from '../utils/helpers'

class AddPost extends Component{

  submitPost = e => {
    e.preventDefault()
    const postData = {
      id: uuidv4(),
      timestamp: Date.now(),
      title: e.target.title.value,
      body: e.target.body.value,
      author: e.target.author.value,
      category: e.target.category.value
    }
    this.props.addNewPost(postData, () => this.props.history.push('/'))
  }

  render(){
    const { categories } = this.props
    return(
      <div className="container">
        <div className="add-post-form">
          <form onSubmit={this.submitPost}>
            <h2>Create a Post:</h2>
            <ul className="form-style-1">
              <li>
                <label>Author: </label>
                <input type="text" name="author" className="field-long" />
              </li>
              <li>
                <label>Title: </label>
                <input type="text" name="title" className="field-long" />
              </li>
              <li>
                <label>Category: </label>
                <select name="category" className="selectCategory">
                  {categories && categories.map((cat)=> (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </li>
              <li>
                <label>Content/Body: </label>
                <textarea type="text" name="body" className="textArea" />
              </li>
            </ul>
            <button className="btn-categories">Submit Post</button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ categories }){
  return {
    categories: categories
  }
}

export default connect(mapStateToProps, actions) (AddPost)
