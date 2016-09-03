import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from '../actions';

class Header extends Component {
  renderLinks() {
    let {userInfo} = this.props;
    if (this.props.authenticated && this.props.userInfo) {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/profile">{this.props.userInfo.username}</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      ]
    } else {
      return [
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ]
    }
  }
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <Link to="/" className="navbar-brand">Sauthenkovich</Link>
        <ul className="nav navbar-nav navbar-right">
          {this.renderLinks()}
        </ul>
      </nav>
    )
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    userInfo: state.auth.userInfo
  };
}
export default connect(mapStateToProps, actions)(Header);
