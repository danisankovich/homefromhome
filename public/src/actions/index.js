import {signIn, signUp, userEdit, avatarUpload, myPhotoUpload, getUser, deleteListing} from './funcs/user';
import {createBlog, getBlog, getAllBlogs} from './funcs/blog';
import {getListing, getAllListings, getMyListings, createListing, edit} from './funcs/listing';
import {
  AUTH_USER,
  UNAUTH_USER,
} from './types';
//USER FUNCTIONS
export function signinUser({email, password}) {
  return function(dispatch) {
    signIn(dispatch, {email, password})
  }
}
export function signupUser({email, password, username}) {
  return function(dispatch) {
    signUp(dispatch, {email, password, username})
  }
}
export function editUser({phoneNumber, email, lang}, user) {
  return function(dispatch) {
    userEdit(dispatch, {phoneNumber, email, lang}, user)
  }
}
export function removeListing(id) {
  console.log(id)
  return function(dispatch) {
    deleteListing(id, dispatch)
  }
}
export function uploadMyPhoto(photo, user) {
  return function(dispatch) {
    myPhotoUpload(dispatch, photo, user);
  }
}
export function uploadAvatar(photo, user) {
  return function(dispatch) {
    avatarUpload(photo, user, dispatch)
  }
}
export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER};
}
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function fetchInfo() {
  return function(dispatch) {
    getUser(dispatch);
  }
}
//Listing FUNCTIONS
export function fetchListings(term) {
  if (term) {
    return function(dispatch) {
      getAllListings(term, dispatch)
    }
  }
}
export function fetchMyListings(array) {
  return function(dispatch) {
    getMyListings(array, dispatch);
  }
}
export function newListing(data) {
  return function(dispatch) {
    createListing(data, dispatch);
  }
}

export function fetchSingleListing(id) {
  return function(dispatch) {
    getListing(id, dispatch)
  }
}
export function editListing({listing}, userId) {
  return function(dispatch) {
    edit({listing}, userId, dispatch)
  }
}

//BLOG Functions
export function newBlog(data) {
  return function(dispatch) {
    createBlog(data, dispatch)
  }
}

export function fetchSingleBlog(id) {
  return function(dispatch) {
    getBlog(id, dispatch)
  }
}
export function fetchAllBlogs() {
  return function(dispatch) {
    getAllBlogs(dispatch)
  }
}
