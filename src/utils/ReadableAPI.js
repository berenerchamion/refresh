const api = process.env.REACT_APP_READABLE_API_URL

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

  const headers ={
    'Accept': 'application/json',
    'Authorization': token,
    'Content-Type': 'application/json'
  }

  export const fetchPosts = () => {
    return fetch(`${api}/posts`, { headers })
         .then((res) => res.json())
  }

  export const fetchPost = (id) => {
    return fetch(`${api}/posts/${id}`, { headers })
         .then((res) => res.json())
  }

  export const addPost = (postData) => {
    return fetch (`${api}/posts`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(postData)
    })
  }

  export const editPost = (postData) => {
    return fetch (`${api}/posts/${postData.id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({title: postData.title, body: postData.body})
    })
  }

  export const deletePost = (postData) => {
    return fetch (`${api}/posts/${postData.id}`, {
      method: 'DELETE',
      headers: headers
    })
  }

  export const votePost = (postData) => {
    return fetch (`${api}/posts/${postData.id}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({option: postData.voteType})
    })
  }

  export const fetchCategories = () => {
      return fetch(`${api}/categories`, { headers })
           .then((res) => res.json())
    }

  export const fetchComments = (postId) => {
    return fetch(`${api}/posts/${postId}/comments`, { headers })
         .then((res) => res.json())
  }

  export const addComment = (commentData) => {
    return fetch (`${api}/comments`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(commentData)
    })
  }

  export const editComment = (commentData) => {
    return fetch (`${api}/comments/${commentData.id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({body: commentData.body})
    })
  }

  export const deleteComment = (id) => {
    return fetch (`${api}/comments/${id}`, {
      method: 'DELETE',
      headers: headers
    })
  }

  export const voteComment = (postData) => {
    return fetch (`${api}/comments/${postData.commentId}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({option: postData.voteType})
    })
  }
