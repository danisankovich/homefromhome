import {
  AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_INFO
} from '../actions/types';
export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return {...state, authenticated: true};
    case UNAUTH_USER:
      return {...state, authenticated: false};
    case AUTH_ERROR:
      return { ...state, error: action.payload};
    case FETCH_INFO:
      return {...state, userInfo: action.payload};
  }
  return state;
}
