const API = "http://localhost:3001";

class PostApi {

  static getAllPosts() {
    return fetch( `${API}/posts` , { headers: { Authorization: "whatever-you-want" } }).then( response => {
      return response.json()
    }).catch(error => {
      return error
    });
  }

  static fetchCommentsByPostId ( postId ) {
    return fetch( `${API}/posts/${postId}/comments`, { headers: { Authorization: "whatever-you-want" } }).then( response => {
      return response.json()
        .then( data => data )
    }).catch(error => {
      return error
    });
  }

}

export default PostApi;