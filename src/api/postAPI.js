const API = "http://localhost:3001";

class PostApi {

  static getAllPosts() {
    return fetch( `${API}/posts` , { headers: { Authorization: "whatever-you-want" } })
      .then( response => {
        return response.json()
    }).catch(error => { return error });
  }

  static fetchCommentsByPostId ( postId ) {
    return fetch( `${API}/posts/${postId}/comments`, { headers: { Authorization: "whatever-you-want" } })
      .then( response => {
        return response.json()
          .then( data => data )
    }).catch(error => { return error });
  }

  static postVote = (postId, option) => {
    return fetch(`${API}/posts/${postId}`, { method: `POST`, headers: {
      Authorization: "whatever-you-want",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({option})
    })
    .then( response => {
      return response.json()
    }).catch(error => { return error });
  }

  static deletePost ( postId ) {
    return fetch(`${API}/posts/${postId}`, { method: "DELETE", headers: { Authorization: "whatever-you-want" }})
      .then(res => res)
      .catch(error => { return error });
  };

  static addPost ( post ) {
    return fetch(`${API}/posts`, { method: "POST", headers: {
        Authorization: "whatever-you-want",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    }).then(data => data.json());
  };

  static getAllCategories = () => {
    return fetch(`${API}/categories`, { headers: { Authorization: "whatever-you-want" }})
     .then(res => res.json())
     .then(data => data.categories);
  };

  static getPost = ( postId ) => {
    return fetch(`${API}/posts/${postId}`, { headers: { Authorization: "whatever-you-want" }})
      .then(res => res.json())
      .catch(error => { return error });
  };
}

export default PostApi;