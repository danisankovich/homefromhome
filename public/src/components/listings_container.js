import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Listings from './listings/listings';

//WELCOMING PAGE
class Listings_Container extends Component {
  componentWillMount() {
    this.props.fetchInfo();
  }
  render() {
    let {userInfo} = this.props;
    if(userInfo) {
      return (
        <div>
          <h3>Listings</h3>
          aaa: {this.props.userInfo.username}
          <div className='row'>
            <Listings />
          </div>
        </div>
      );
    }
    return (
      <div>Loading...... </div>
    );
  };
}
function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo};
}
export default connect(mapStateToProps, actions)(Listings_Container);
