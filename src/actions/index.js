import { fetchPosts,
        fetchPost,
      } from '../utils/ReadableAPI'

export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST = 'FETCH_POST'

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
