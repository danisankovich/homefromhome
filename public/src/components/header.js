import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from '../actions';

class Header extends Component {
  componentWillMount() {
    this.props.fetchInfo();
  }
  renderLinks() {
    let {userInfo} = this.props;
    if (this.props.authenticated && this.props.userInfo) {
      return [
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/information">Information</Link>
        </li>,
         <li className="dropdown" key={3}>
           <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              {this.props.userInfo.username}
              <span className="caret"></span>
           </a>
           <ul className="dropdown-menu">
             <li><Link className="nav-link" to="/profile">Profile</Link></li>
             <li><Link className="nav-link" to="/settings">Settings</Link></li>
             <li role="separator" className="divider"></li>
             <li><Link className="nav-link" to="/signout">Sign Out</Link></li>
           </ul>
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
