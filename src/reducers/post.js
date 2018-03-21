import { FETCH_POSTS,
          FETCH_POST,
          VOTE_FOR_POST,
          ADD_POST,
          EDIT_POST,
        } from '../actions'

function posts(state=[], action) {
  const { posts, post, postData } = action

  switch(action.type) {
    case FETCH_POSTS:
      return posts.filter(post => !(post.deleted))
    case FETCH_POST:
      return post
    case ADD_POST:
    return state.concat([postData])
    case EDIT_POST:
      return state.map(post => {
        if (post.id === postData.id){
          post = postData
        }
        return post
      })
    case VOTE_FOR_POST:
      return state.map(post => {
        if (post.id === action.postData.postId) {
          if (action.postData.voteType === "upVote") {
            post.voteScore += 1
          }
          else if (action.postData.voteType === "downVote") {
            post.voteScore -= 1
          }
        }
        return post
      })
    default:
      return state
  }
}
export default posts
