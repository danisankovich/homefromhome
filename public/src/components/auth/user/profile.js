import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import PhotoBook from './photobook';
import MyListings from './myListings';
import MyBlogs from './bloglist';
import MyApplications from './myApplications';

class Profile extends Component {
  componentWillMount() {
    this.setState({showPhotos: false, showListings: false, showBlogs: false, showApplications: false})
  }
  componentDidMount() {
    this.props.fetchInfo();
  }
  show() {
    const resetObj = {
      showPhotos: false,
      showListings: false,
      showBlogs: false,
      showApplications: false
    }
    const self = this[0];
    const type = this[1];
    resetObj[type] = true;
    self.setState(resetObj);
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
              <button className='btn btn-primary' onClick={this.show.bind([this, 'showPhotos'])}>Show Albums</button>
              <button className='btn btn-primary' onClick={this.show.bind([this, 'showListings'])}>Show Listings ({this.props.userInfo.myListings.length})</button>
              <button className='btn btn-primary' onClick={this.show.bind([this, 'showBlogs'])}>Show Blogs ({this.props.userInfo.blogs.length})</button>
              <button className='btn btn-primary' onClick={this.show.bind([this, 'showApplications'])}>Show Applications ({this.props.userInfo.applications.length})</button>
            </div>
            <div className="col-sm-10 col-sm-offset-1">
              {this.state.showPhotos && <PhotoBook userInfo={this.props.userInfo}></PhotoBook>}
              {this.state.showListings && <MyListings userInfo={this.props.userInfo}></MyListings>}
              {this.state.showBlogs && <MyBlogs userInfo={this.props.userInfo}></MyBlogs>}
              {this.state.showApplications && <MyApplications userInfo={this.props.userInfo}></MyApplications>}
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
