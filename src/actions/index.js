import { fetchPosts,
        fetchPost,
        fetchCategories,
        votePost,
        editPost,
        addPost,
        deletePost,
        fetchComments,
        addComment,
        editComment,
        deleteComment,
        voteComment,
      } from '../utils/ReadableAPI'

export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST = 'FETCH_POST'
export const VOTE_FOR_POST = 'VOTE_FOR_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

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

  export const deleteThisPost = (postData, cb) => {
    return (dispatch) => {
      deletePost(postData).then(() => cb())
      dispatch({ type: DELETE_POST, postData })
    }
  }

  export const submitEdit = (postData, cb) => {
    return (dispatch) => {
      editPost(postData).then(() => cb())
      dispatch({type: EDIT_POST, postData})
    }
  }

  //Comments related APIs
  export const ADD_COMMENT = 'ADD_COMMENT'
  export const EDIT_COMMENT = 'EDIT_COMMENT'
  export const DELETE_COMMENT = 'DELETE_COMMENT'
  export const FETCH_COMMENTS = 'FETCH_COMMENTS'
  export const VOTE_FOR_COMMENT = 'VOTE_FOR_COMENT'

  export const fetchPostComments = (postId) => {
    return (dispatch) => {
      fetchComments(postId).then(comments => {
        dispatch({ type: FETCH_COMMENTS, postId, comments})
      })
    }
  }

  export const addNewComment = (commentData, cb) => {
    return (dispatch) => {
      addComment(commentData).then(() => cb())
      dispatch({type: ADD_COMMENT, commentData})
    }
  }

  export const deleteThisComment = (commentData, cb) => {
    return (dispatch) => {
      deleteComment(commentData.id).then(() => cb())
      dispatch({ type: DELETE_COMMENT, commentData })
    }
  }

  export const editThisComment = (commentData, cb) => {
    return (dispatch) => {
      deleteComment(commentData.id).then(() => cb())
      dispatch({ type: EDIT_COMMENT, commentData })
    }
  }

  export const voteForComment = (postData) => {
      return (dispatch) => {
        voteComment(postData)
        dispatch({type: VOTE_FOR_COMMENT, postData })
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
