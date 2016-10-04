import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import { browserHistory } from 'react-router'
import MyListingTable from './mylistingtable'
class MyListings extends Component {
  componentWillMount() {
    let listings = this.props.userInfo.myListings
    this.props.fetchMyListings(listings)
  }
  handleClick() {
    let clickResult = this._id;
    browserHistory.push(`/listings/${clickResult}`);
  }
  render() {
    let listings = this.props.mylistings || []
    if(listings) {
      return (
        <div>
          {listings && listings.length > 0 && <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Listing Name</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Address</th>
                <th>Price Per Night</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {listings.map(function(result) {
                return (
                  <MyListingTable result={result} key={result._id} />
                )
              }.bind(this))}
            </tbody>
          </table>}
        </div>
      )
    } else {
      return <div>LOADING...</div>
    }

  }
}

function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo, mylistings: state.listing.mylistings};
}
export default connect(mapStateToProps, actions)(MyListings);
