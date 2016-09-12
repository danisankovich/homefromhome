import {
  NEW_BLOG, FETCH_SINGLE_BLOG, FETCH_ALL_BLOGS
} from '../actions/types';
export default function(state = {}, action) {
  switch(action.type) {
    case NEW_BLOG:
      return {...state, blogs: action.payload};
    case FETCH_SINGLE_BLOG:
      return {...state, blog: action.payload};
    case FETCH_ALL_BLOGS:
      return {...state, blogs: action.payload};
  }
  return state;
}
