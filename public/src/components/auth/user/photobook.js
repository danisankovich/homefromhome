import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import { browserHistory } from 'react-router'


class PhotoBook extends Component {
  componentWillMount() {
    this.props.fetchInfo();
  }
  uploadPhoto() {
    this.props.uploadMyPhoto('asfsdf', this.props.userInfo._id)
  }
  render() {
    let {userInfo} = this.props;
    let photos = userInfo.myPhotos || [];
    console.log(userInfo)
    if(photos) {
      return (
        <div className="col-sm-12">
          <button onClick={this.uploadPhoto.bind(this)}>asdfs f</button>
          <div className="col-sm-10 col-sm-offset-1">
            <div className="col-sm-12">
              {photos.map((e) => {
                return (
                  <div className="col-sm-3" key={e._id} onClick={() => {browserHistory.push(`/myphotos/${e._id}`)}}>
                    <ul className="photoBookBorder">
                      <li>{e.title}</li>
                      <li>{e.tagline}</li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return <div className="toppush"><h1>LOADING........</h1></div>
    }

  }
}
function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo};
}
export default connect(mapStateToProps, actions)(PhotoBook);
