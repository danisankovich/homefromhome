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
          <h2>{userInfo.username + "'s"} Profile</h2>
          <h3>Email: {userInfo.email}</h3>
          <h3>Phone Number: {userInfo.phoneNumber}</h3>
          <h4>
            Languages: {
              userInfo.languages.map((lang, i) => {
                if (i === this.props.userInfo.languages.length -1) {
                  return lang;
                }
                return lang + ', '
              })
            }
          </h4>
          <img src={this.props.userInfo.avatar} height='200px'/>
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
