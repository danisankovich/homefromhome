import {
  NEW_BLOG, FETCH_SINGLE_BLOG
} from '../actions/types';
export default function(state = {}, action) {
  switch(action.type) {
    case NEW_BLOG:
      return {...state, blogs: action.payload};
    case FETCH_SINGLE_BLOG:
      return {...state, blog: action.payload};
  }
  return state;
}
