import * as types from '../constants/action-types'

const initialState = {
  categories: []
};

export default function categories( state = initialState.categories, action ) {
  switch (action.type) {
    case types.GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      };

    default:
      return state;
  }
}
