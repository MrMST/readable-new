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
        postApi
          .fetchCommentsByPostId(post.id)
          .then(comments => (post.comments = comments))
          .then(() => post)
        )
      )
    )
    .then(posts => dispatch(fetchPostsSuccess(posts)));

export const sendPostVote = ( postId, option ) => dispatch =>
  postApi.postVote( postId, option ).then(post => dispatch(votePost( post )));

export const votePost = post => ({
  type: types.VOTE_POST,
  payload: post
});

export const changeSortAction = sort => {
  return {
    type: types.CHANGE_SORT,
    value: sort.value
  };
};

export const sendDeletePost = ( postId ) => dispatch =>
  postApi.deletePost( postId ).then(post => dispatch(deletePost( postId )));

export const deletePost = ( postId ) => ({
  type: types.DELETE_POST,
  postId
});

export const sendAddPost = ( post ) => dispatch =>
  postApi.addPost( post ).then(post => dispatch(addPost( post )));

export const addPost = ( post ) => ({
  type: types.ADD_POST,
  post
});

export const fetchCategoriesSuccess = categories => ({
  type: types.FETCH_CATEGORIES,
  categories
});

export const fetchCategories = () => dispatch =>
  postApi.getAllCategories().then(categories => dispatch(fetchCategoriesSuccess( categories )));
