import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';


import App from './components/app';

// Main Routes
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import Information from './components/infoPage/information';
import Profile from './components/auth/user/profile';
import UserProfile from './components/auth/user/otheruser/userProfile';
import Settings from './components/auth/user/settings';
import Welcome_Container from './components/welcome_container';

// Listings Routes
import Listings_Container from './components/listings/listings_container';
import Listing from './components/listings/listing';
import NewListing from './components/listings/newListing';

// blog Routes
import Blog_Container from './components/blog/blog_container';
import My_Blog from './components/blog/mine/my_blog';
import New_Blog from './components/blog/mine/new_blog';
import Blog_List from './components/blog/blog_list';
import Single_Blog from './components/blog/single_blog';

import RequireAuth from './components/auth/require_auth';

import reducers from './reducers';
import {AUTH_USER} from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk, ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
//if we have a token, user persists on refresh/close
if (token) {
  store.dispatch({type: AUTH_USER}); //any action in here is sent off to all reducers in the application, just as with other dispatch
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Welcome_Container} />
          <Route path='signin' component={Signin}></Route>
          <Route path='signup' component={Signup}></Route>
          <Route path='signout' component={Signout}></Route>
          <Route path='information' component={Information}></Route>
          <Route path='profile' component={RequireAuth(Profile)}></Route>
          <Route path='settings' component={RequireAuth(Settings)}></Route>
          <Route path='userprofile/:id' component={UserProfile}></Route>
        </Route>
        <Route path='/listings' component={App}>
          <IndexRoute component={Listings_Container} />
          <Route path=':id' component={Listing}></Route>
          <Route path='/new' component={RequireAuth(NewListing)}></Route>
          <Route path='signout' component={Signout}></Route>
          <Route path='information' component={RequireAuth(Information)}></Route>
          <Route path='profile' component={RequireAuth(Profile)}></Route>
          <Route path='settings' component={RequireAuth(Settings)}></Route>
        </Route>
        <Route path='/blogs' component={App}>
          <IndexRoute component={Blog_Container} />
          <Route path='/blogs/mine' component={RequireAuth(My_Blog)}></Route>
          <Route path='/blogs/mine/new' component={RequireAuth(New_Blog)}></Route>
          <Route path='/blogs/:id' component={Single_Blog}></Route>
        </Route>
    </Router>
  </Provider>
  , document.querySelector('.thing'));
