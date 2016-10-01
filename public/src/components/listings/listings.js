import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import city_states from '../../../cities';
import states from '../../../states';
import countries from '../../../countries';

import TableListing from './tools/tablelisting';
import ListingSearch from './tools/listing_search';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = { city: '', country: ''};
  }
  componentWillMount() {
    this.props.fetchInfo();
  }
  render() {
    let listings = [];
    if(this.props.listings) {
      listings = this.props.listings
    }
    return (
      <div>
        <div>
          <ListingSearch />
        </div>
        {listings && listings.length > 0 && <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Listing Name</th>
              <th>Country</th>
              {this.state.country === 'United States' && <th>State</th>}
              <th>City</th>
              <th>Address</th>
              <th>Price Per Night</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {listings.map(function(result) {
              return <TableListing result={result} key={result._id}/>
            }.bind(this))}
          </tbody>
        </table>}
      </div>
    );
  };
}
function mapStateToProps(state) {
  return {listings: state.listing.listings};
}
export default connect(mapStateToProps, actions)(Listing);
