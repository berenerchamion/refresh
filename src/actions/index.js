import { fetchPosts,
        fetchPost,
        fetchCategories,
        votePost,
        editPost,
        addPost,
      } from '../utils/ReadableAPI'

export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST = 'FETCH_POST'
export const VOTE_FOR_POST = 'VOTE_FOR_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'

export const fetchAllPosts = () => {
  return (dispatch) => {
    fetchPosts().then(posts => {
      dispatch({ type: FETCH_POSTS, posts })
    })
  }
}

//Get one post by id
export const fetchOnePost = (id) => {
  return (dispatch) => {
    fetchPost(id).then(post => {
      dispatch({type: FETCH_POST, post })
    })
  }
}

export const voteForPost = (postData) => {
    return (dispatch) => {
      votePost(postData)
      dispatch({type: VOTE_FOR_POST, postData })
    }
  }

  export const addNewPost = (postData, cb) => {
    return (dispatch) => {
      addPost(postData).then(() => cb())
      dispatch({ type: ADD_POST, postData })
    }
  }

  export const submitEdit = (postData, cb) => {
    return (dispatch) => {
      editPost(postData).then(() => cb())
      dispatch({type: EDIT_POST, postData})
    }
  }

//Categories related APIs
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

export const fetchAllCategories = () => {
    return (dispatch) => {
      fetchCategories().then(categories => {
        dispatch({ type: FETCH_CATEGORIES, categories })
      })
  }

}
