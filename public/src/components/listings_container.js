import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Listings from './listings/listings';

//WELCOMING PAGE
class Listings_Container extends Component {
  componentWillMount() {
    this.props.fetchInfo();
    this.props.fetchListings();
  }
  render() {
    let {listings, userInfo} = this.props;
    if(listings) {
      return (
        <div>
          <h3>Listings</h3>
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
  return {userInfo: state.auth.userInfo, listings: state.listing.listings};
}
export default connect(mapStateToProps, actions)(Listings_Container);
