import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import PhotoBook from './photobook';

class Profile extends Component {
  componentWillMount() {
    this.props.fetchInfo();
  }
  render() {
    let {userInfo} = this.props;
    if(userInfo) {
      let photos = userInfo.myPhotos;
      return (
        <div className="toppush container">
          <h2>{this.props.userInfo.username + "'s"} Profile</h2>
          <PhotoBook />
        </div>
      );
    }
    return (
      <div>Loading........ </div>
    );
  };
}
function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo};
}
export default connect(mapStateToProps, actions)(Profile);
