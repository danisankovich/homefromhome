import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../actions';
import PhotoBook from './photobook';
import ProfileListings from './profilelistings';

class UserProfile extends Component {
  componentWillMount() {
    this.props.fetchInfo();
    let id = this.props.location.pathname.split('userprofile/')[1]
    this.props.fetchProfileInfo(id);
    this.setState({showPhotos: false, showListings: false})
  }
  showAlbums() {
    this.state.showListings = false
    this.state.showPhotos ? this.setState({showPhotos: false}) : this.setState({showPhotos: true})
  }
  showListings() {
    this.state.showPhotos = false
    this.state.showListings ? this.setState({showListings: false}) : this.setState({showListings: true})
  }
  render() {
    let {userProfile, userInfo} = this.props;
    if(userProfile && userProfile.languages) {
      let photos = userProfile.myPhotos;
      return (
        <div className="toppush container">
          <div className='row'>
            <div className="col-sm-10 col-sm-offset-1">
              <h2>{userProfile.username + "'s"} Profile</h2>
              <h3>Email: {userProfile.email}</h3>
              <h3>Phone Number: {userProfile.phoneNumber}</h3>
              <h4>
                Languages: {
                  userProfile.languages.map((lang, i) => {
                    if (i === this.props.userProfile.languages.length -1) {
                      return lang;
                    }
                    return lang + ', '
                  })
                }
              </h4>
              <img src={this.props.userProfile.avatar} height='200px'/>
            </div>
          </div>
          <div className='row'>
            <div className="col-sm-10 col-sm-offset-1">
              <button onClick={this.showAlbums.bind(this)}>Show Albums</button>
              <button onClick={this.showListings.bind(this)}>Show Listings</button>
            </div>
            <div className="col-sm-10 col-sm-offset-1">
              {this.state.showPhotos && <PhotoBook userProfile={this.props.userProfile}></PhotoBook>}
              {this.state.showListings && <ProfileListings userProfile={this.props.userProfile}></ProfileListings>}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>Loading........ </div>
    );
  };
}
function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo, userProfile: state.auth.userProfile};
}
export default connect(mapStateToProps, actions)(UserProfile);
