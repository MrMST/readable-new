import * as types from '../constants/action-types'

const initialState = {
  sort: 'timestamp'
};

export default function sort( state = initialState.sort, action ) {
  switch(action.type) {
    case types.CHANGE_SORT:
      return action.value;

      default:
        return state;
  }
}