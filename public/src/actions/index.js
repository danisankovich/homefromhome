import $ from 'jquery';
import { browserHistory } from 'react-router'; // commits info about url to react router, and to make changes to url
import {
  AUTH_USER,
  AUTH_ERROR,
  EDIT_USER,
  UPLOAD_PHOTO,
  UNAUTH_USER,
  FETCH_INFO,
  FETCH_LISTINGS,
  NEW_LISTING,
  FETCH_SINGLE_LISTING,
  NEW_BLOG,
  FETCH_SINGLE_BLOG,
  FETCH_ALL_BLOGS,
  SET_MARKDOWN,
} from './types';

const ROOT_URL = 'http://localhost:3000/api';

export function signinUser({email, password}) {
  return function(dispatch) { //redux-thunk gives access to the dispatch
                              //function. it lets use return a function instead
                              //of an object from action creator
    $.post(`${ROOT_URL}/signin`, { email, password })
      .done(response => {
        dispatch({type: AUTH_USER});
        localStorage.setItem('token', response.token);
        browserHistory.push('/'); // success pushes you to /information.
      })
      .fail(() => {
        // catch does not take you to new page
        dispatch(authError('EMAIL/PASSWORD combo incorrect'));
      })
  }
}

export function signupUser({email, password, username}) {
  return function(dispatch) {
    $.ajax({
      url: `${ROOT_URL}/signup`,
      type: "POST",
      data: {email, password, username},
    })
      .done(response => {
        dispatch({type: AUTH_USER});

        localStorage.setItem('token', response.token);

        browserHistory.push('/information'); // success pushes you to /information.
      }).fail((error) => {
        console.log(error)
        dispatch(authError(error.response.error));
      });
  }
}
export function editUser({phoneNumber, email, lang}, user) {
  return function(dispatch) {
    console.log(lang)
    dispatch({type: EDIT_USER});

    $.ajax({
      url: `${ROOT_URL}/editInfo`,
      type: "POST",
      data: {phoneNumber, email, user, 'lang': lang },
    })
      .done(response => {
        dispatch({type: FETCH_INFO});
      }).fail((error) => {
        console.log(error)
        dispatch(authError(error.response.error));
      });
  }
}
export function uploadMyPhoto(photo, user) {
  return function(dispatch) {
    dispatch({type: UPLOAD_PHOTO});

    $.ajax({
      url: `${ROOT_URL}/uploadmyphoto`,
      type: "POST",
      data: {image: photo.image, location: photo.location, tagline: photo.tagline, user},
    })
      .done(response => {
        dispatch({type: FETCH_INFO});
      }).fail((error) => {
        console.log(error)
        dispatch(authError(error.response.error));
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER};
}

export function fetchInfo() {
  var token = localStorage.getItem('token')
  return function(dispatch) {
    $.ajax({
       url: ROOT_URL,
       type: "GET",
       headers: {
          "authorization": token
       }
    }).done((response) => {
      dispatch({
        type: FETCH_INFO,
        payload: response
      })
    });
  }
}

export function fetchListings(term) {
  return function(dispatch) {

    $.ajax({
       url: `api/listings/location/${term}`,
       type: "GET",
    }).done((response) => {
      dispatch({
        type: FETCH_LISTINGS,
        payload: response
      })
    });
  }
}
export function newListing(data) {
  var token = localStorage.getItem('token')
  return function(dispatch) {
    $.ajax({
       url: `${ROOT_URL}/listings/new`,
       type: "POST",
       headers: {
          "authorization": token
       },
       data: data
    }).done((response) => {
      dispatch({
        type: NEW_LISTING,
        payload: response
      })
    })
  }
}
export function newBlog(data) {
  console.log(data)
  return function(dispatch) {
    $.ajax({
       url: `${ROOT_URL}/blogs/new`,
       type: "POST",
       data: data
    }).done((response) => {
      console.log(response)
      dispatch({
        type: NEW_BLOG,
        payload: response
      })
      browserHistory.push('/blogs/mine'); // success pushes you to /information.
    }).fail((err) => {
      console.log(err)
    });
  }
}

export function fetchSingleListing(id) {
  var token = localStorage.getItem('token')
  return function(dispatch) {
    $.ajax({
       url: `${ROOT_URL}/listings/${id}`,
       type: "GET",
       headers: {
          "authorization": token
       }
    }).done((response) => {
      dispatch({
        type: FETCH_SINGLE_LISTING,
        payload: response
      })
    });
  }
}

export function fetchSingleBlog(id) {
  return function(dispatch) {
    $.ajax({
       url: `/api/blogs/${id}`,
       type: "GET",
    }).done((response) => {
      dispatch({
        type: FETCH_SINGLE_BLOG,
        payload: response
      })
    });
  }
}
export function fetchAllBlogs() {
  return function(dispatch) {
    $.ajax({
       url: `/api/blogs/`,
       type: "GET",
    }).done((response) => {
      dispatch({
        type: FETCH_ALL_BLOGS,
        payload: response
      })
    });
  }
}
