import * as types from '../constants/action-types';
// import * as postApi from '../api/postAPI';
import postApi from '../api/postAPI';

export const fetchPostsSuccess =  ( posts ) => {
  return {
    type: types.FETCH_POSTS,
    payload: posts
  };
}

export const fetchPosts = () => dispatch =>
  postApi
    .getAllPosts().then(posts =>
      Promise.all( posts.map(post =>
        postApi.fetchCommentsByPostId(post.id).then(comments => (post.comments = comments)).then(() => post)
      )))
    .then(posts => dispatch(fetchPostsSuccess( posts )));

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

export const fetchCategoriesSuccess = ( categories ) => ({
  type: types.FETCH_CATEGORIES,
  categories
});

export const fetchCategories = () => dispatch =>
  postApi.getAllCategories().then(categories => dispatch(fetchCategoriesSuccess( categories )));

export const getPostSuccess = ( posts ) => ({
  type: types.FETCH_POST,
  posts
});

export const getPost = ( postId ) => dispatch =>
  postApi.getPost( postId ).then(posts => dispatch(getPostSuccess( posts )));

export const editPostSuccess = ( post, postId ) => ({
  type: types.UPDATE_POST,
  post,
  postId
});

export const editPost = ( post, postId ) => dispatch =>
  postApi.editPost( post, postId ).then(post => dispatch(editPostSuccess( post )));