import * as types from '../constants/action-types';
import postApi from '../api/postAPI';

export function fetchPostsSuccess ( posts ) {
  return {
    type: types.FETCH_POSTS_SUCCESS,
    posts
  };
}

// export function fetchPosts() {
//   return function(dispatch) {
//     return postApi.getAllPosts().then( posts => {
//       dispatch(fetchPostsSuccess( posts ));
//     }).catch(error => {
//       throw(error);
//     });
//   };
// }

// export function fetchPosts() {
//   return function(dispatch) {
//     return postApi.getAllPosts()
//       .then( posts =>
//         Promise.all(
//           posts.map( post =>
//             postApi
//               .fetchCommentsByPostId( post.id )
//               .then( comments => ( post.comments = comments ))
//               .then( ( post ) => post)
//           )
//         )
//       )
//     .then( posts => fetchPostsSuccess( posts ) )
//   };
// }

export const fetchPosts = () => dispatch =>
  postApi
    .getAllPosts()
    .then(posts =>
      Promise.all(
        posts.map(post =>
          postApi
            .fetchCommentsByPostId(post.id)
            .then(comments => (post.comments = comments))
            .then(() => post)
        )
      )
    )
    .then(posts => dispatch(fetchPostsSuccess(posts)));

// export const getPosts = () => dispatch =>
//   api
//     .getPosts()
//     .then(posts =>
//       Promise.all(
//         posts.map(post =>
//           api
//             .getComments(post.id)
//             .then(comments => (post.comments = comments))
//             .then(() => post)
//         )
//       )
//     )
//     .then(posts => dispatch(receivePosts(posts)));