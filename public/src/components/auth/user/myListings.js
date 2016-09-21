import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import { browserHistory } from 'react-router'

class MyListings extends Component {
  componentWillMount() {
    let listings = this.props.userInfo.myListings
    this.props.fetchMyListings(listings)
  }
  render() {
    if(this.props.mylistings) {
      return (
        <div>
          {this.props.mylistings.map((result) => {
            return (
              <div className="col-sm-4" key={result._id}>
                <div className="listingBorder">
                  <div className="thumbnail">
                    <img className="img-responsive center-block listingListImage"
                      src={result.image}
                      />
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-10 col-sm-offset-1">
                      <h3>Country: {result.location.country}</h3>
                      <h3>City: {result.location.city}</h3>
                      <h3>Price: ${result.pricePerNight} / night</h3>
                    </div>
                  </div>
                </div>
                <br />
              </div>
            );
          })}
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
