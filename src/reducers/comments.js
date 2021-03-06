import {
        FETCH_COMMENTS,
        ADD_COMMENT,
        EDIT_COMMENT,
        DELETE_COMMENT,
        VOTE_FOR_COMMENT
        } from '../actions'

function comments(state={}, action) {
  const { commentData, postData, comments } = action
  switch(action.type) {
    case FETCH_COMMENTS:
      return{
        ...state,
        [action.postId]: comments
      }
    case ADD_COMMENT:
      return{
        ...state,
        [commentData.parentId]: state[commentData.parentId].concat([commentData])
      }
    case EDIT_COMMENT:
      return {
        ...state,
        [commentData.parentId]: state[commentData.parentId].map(comment => {
          if (comment.id === commentData.id){
            comment.author = commentData.Author
            comment.body = commentData.body
          }
          return comment
        })
      }
    case DELETE_COMMENT:
      return {
        ...state,
        [commentData.parentID]: state[commentData.parentId].map(comment => {
          if (comment.id === commentData.id){
            comment.deleted = true
          }
          return comment
        })
      }
    case VOTE_FOR_COMMENT:
      return{
        ...state,
        [postData.postId ]: state[postData.postId].map(comment => {
          if (comment.id === postData.commentId){
            if (action.postData.voteType === "upVote") {
              comment.voteScore += 1
            }
            if (action.postData.voteType === "downVote") {
              comment.voteScore -= 1
            }
          }
          return comment
        })
      }
    default:
      return state
  }
}

export default comments
