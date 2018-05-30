import * as types from '../constants/action-types'

const initialState = {
  posts: []
};

export default function posts( state = initialState.posts, action ) {
  switch(action.type) {

    case types.FETCH_POSTS:
      return action.payload

    case types.VOTE_POST:
      const posts = state.map( post => {
        if ( post.id === action.payload.id ) {
          post.voteScore = action.payload.voteScore;
        }
        return post;
      });
      return posts;

    case types.DELETE_POST:
      const remainingPosts = state.filter(
        item => item.id !== action.postId
      );
      return remainingPosts

    case types.FETCH_POST:
      return {
        ...state,
        posts: [action.posts]
      };

    default:
        return state;
  }
}