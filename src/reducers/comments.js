import * as types from '../constants/action-types'

const initialState = {
  comments: []
};

export default function comments( state = initialState.comments, action ) {

  switch (action.type) {
    case types.GET_COMMENTS:
      return {
        ...state,
        comments: action.comments
      };

    default:
      return state;
  }
}