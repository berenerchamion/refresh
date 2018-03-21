import { FETCH_POSTS,
          FETCH_POST
        } from '../actions'

function posts(state=[], action) {
  const { posts, post } = action

  switch(action.type) {
    case FETCH_POSTS:
      return posts.filter(post => !(post.deleted))
    case FETCH_POST:
      return post
    default:
      return state
  }
}
export default posts
