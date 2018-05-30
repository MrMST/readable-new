import * as types from '../constants/action-types'

const initialState = {
  posts: [],
  loading: false,
  error: null
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_POSTS_START:
    return {
      ...state,
      loading: true,
      error: null
    };

    case FETCH_POSTS:
    console.log('reducer: ' + action.payload)
    return {
      ...state,
      loading: false,
      posts: action.payload.posts
    };

    case FETCH_POSTS_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      posts: []
    };

    default:
      return state;
  }
};

export default postReducer;