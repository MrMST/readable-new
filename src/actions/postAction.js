import * as types from '../constants/action-types';
// import * as postApi from '../api/postAPI';
import postApi from '../api/postAPI';

export const getPostsSuccess =  ( posts ) => {
  return {
    type: types.GET_POSTS,
    payload: posts
  };
}

export const getPosts = () => dispatch =>
  postApi
    .getAllPosts().then(posts =>
      Promise.all( posts.map(post =>
        postApi.getCommentsByPostId(post.id).then(comments => (post.comments = comments)).then(() => post)
      )))
    .then(posts => dispatch(getPostsSuccess( posts )));

export const votePostSuccess = post => ({
  type: types.VOTE_POST,
  payload: post
});

export const postVote = ( postId, option ) => dispatch =>
  postApi.postVote( postId, option ).then(post => dispatch(votePostSuccess( post )));

export const changeSortAction = sort => {
  return {
    type: types.CHANGE_SORT,
    value: sort.value
  };
};

export const deletePostSuccess = ( postId ) => ({
  type: types.DELETE_POST,
  postId
});

export const deletePost = ( postId ) => dispatch =>
  postApi.deletePost( postId ).then(post => dispatch(deletePostSuccess( postId )));

export const addPostSuccess = ( post ) => ({
  type: types.ADD_POST,
  post
});

export const addPost = ( post ) => dispatch =>
  postApi.addPost( post ).then(post => dispatch(addPostSuccess( post )));

export const getCategoriesSuccess = ( categories ) => ({
  type: types.GET_CATEGORIES,
  categories
});

export const getCategories = () => dispatch =>
  postApi.getAllCategories().then(categories => dispatch(getCategoriesSuccess( categories )));

export const getPostSuccess = ( posts ) => ({
  type: types.GET_POST,
  posts
});

export const getPost = ( postId ) => dispatch =>
  postApi.getPost( postId ).then(posts => dispatch(getPostSuccess( posts )));

export const updatePostSuccess = ( post, postId ) => ({
  type: types.UPDATE_POST,
  post,
  postId
});

export const updatePost = ( post, postId ) => dispatch =>
  postApi.editPost( post, postId ).then(post => dispatch(updatePostSuccess( post )));

export const getCommentsSuccess = ( comments ) => ({
  type: types.GET_COMMENTS,
  comments
});

export const getComments = ( postId ) => dispatch =>
  postApi.getComments( postId ).then(comments => dispatch(getCommentsSuccess( comments )));