import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { browserHistory } from 'react-router'


class Listing extends Component {
  handleClick() {
    let clickResult = this._id;
    browserHistory.push(`/listings/${clickResult}`);

  }
  componentWillMount() {
    this.props.fetchInfo();
    this.props.fetchListings();
  }
  render() {
    const { handleSubmit} = this.props;

    let {userInfo, listings} = this.props;
    if(listings) {
      return (
        <div>
          {listings.map(function(result) {
            return (
              <div className="col-sm-4" key={result._id} onClick={this.handleClick.bind(result)}>
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
          }.bind(this))}
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
export default connect(mapStateToProps, actions)(Listing);
