import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import PhotoBook from './photobook';
import MyListings from './myListings';

class Profile extends Component {
  componentWillMount() {
    this.props.fetchInfo();
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
    let {userInfo} = this.props;
    if(userInfo && userInfo.languages) {
      let photos = userInfo.myPhotos;
      return (
        <div className="toppush container">
          <div className='row'>
            <div className="col-sm-10 col-sm-offset-1">
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
            </div>
          </div>
          <div className='row'>
            <div className="col-sm-10 col-sm-offset-1">
              <button onClick={this.showAlbums.bind(this)}>Show Albums</button>
              <button onClick={this.showListings.bind(this)}>Show Listings</button>
            </div>
            <div className="col-sm-10 col-sm-offset-1">
              {this.state.showPhotos && <PhotoBook userInfo={this.props.userInfo}></PhotoBook>}
              {this.state.showListings && <MyListings userInfo={this.props.userInfo}></MyListings>}
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
  return {userInfo: state.auth.userInfo};
}
export default connect(mapStateToProps, actions)(Profile);
