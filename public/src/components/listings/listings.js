import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Listing extends Component {
  componentWillMount() {
    this.props.fetchInfo();
    this.props.fetchListings();
  }
  render() {
    let {userInfo, listings} = this.props;
    if(userInfo && listings) {
      console.log(listings)
      return (
        <div>
          {listings.map(function(result) {
            console.log(result)
            return (
              <div className="col-sm-4" key={result._id}>
                <div className="listingBorder">
                  <div className="thumbnail">
                    <img className="img-responsive center-block"
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
