import {
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR
} from '../constants/action-types'

const API = "http://localhost:3001";

export const fetchPostsStart = () => ({
  type: FETCH_POSTS_START
});

export const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  payload:  posts
});

export const fetchPostsError = error => ({
  type: FETCH_POSTS_ERROR,
  payload: { error }
});

export function fetchPosts () {
  return dispatch => {
    dispatch( fetchPostsStart() );
    return fetch( `${API}/posts` , { headers: { Authorization: "whatever-you-want" } })
      .then( checkForErrors )
      .then( res => res.json() )
      .then( json => {
        dispatch( fetchPostsSuccess( json.posts ) );
        return json.posts;
      })
      .catch( error => dispatch( fetchPostsError( error ) ) );
  };
}

function checkForErrors( response ) {
  if (response.ok) {
    return response;
  }
  throw Error(response.statusText);
}

