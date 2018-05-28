import * as types from '../constants/action-types';

const initialState = {
  posts: []
};

export default function posts(state = initialState.posts, action) {
  switch(action.type) {
    case types.FETCH_POSTS_SUCCESS:
      return action.posts


    default:
      return state;
  }
}