import {
  NEW_BLOG
} from '../actions/types';
export default function(state = {}, action) {
  switch(action.type) {
    case NEW_BLOG:
      return {...state, blogs: action.payload};
  }
  return state;
}
