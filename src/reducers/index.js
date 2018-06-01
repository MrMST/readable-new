import { combineReducers } from 'redux'
import posts from './posts'
import sort from './sort'
import categories from './categories'
import comments from './comments'

export default combineReducers ({
  posts,
  sort,
  categories,
  comments
})