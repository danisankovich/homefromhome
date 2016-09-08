import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { browserHistory } from 'react-router'
import _ from 'lodash';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = { city: '', country: '', listings: [] };
  }
  componentWillMount() {
    this.props.fetchInfo();
    // this.props.fetchListings();
  }
  onInputChangeCity(term) {
    this.setState({city: term});
  }
  onInputChangeCountry(term) {
    this.setState({country: term});
  }
  handleClick() {
    let clickResult = this._id;
    browserHistory.push(`/listings/${clickResult}`);
  }
  cityCountrySearch() {
    this.props.fetchListings(`${this.state.country}_${this.state.city}`)
  }
  render() {
    const cityCountrySearch = this.cityCountrySearch;
    let {userInfo} = this.props;
    let listings = [];
    if(this.props.listings) {
      listings = this.props.listings
    }
    return (
      <div>
        <div className='col-sm-12'>
          <div className='col-sm-1'><label className='searchLabel'>City/State: </label></div>
          <div className='col-sm-4'>
            <input placeholder='Enter City' className="form-control searchInput" id='searchBar'
              value={this.state.city}
              onChange={event => this.onInputChangeCity(event.target.value)}/>
          </div>
          <div className='col-sm-4'>
            <input placeholder='Enter Country' className="form-control searchInput" id='searchBar'
              value={this.state.country}
              onChange={event => this.onInputChangeCountry(event.target.value)}/>
          </div>
          <div className='col-sm-2'>
            <button className='btn btn-primary' onClick={this.cityCountrySearch.bind(this)}>Search City</button>
          </div>
        </div>
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
};
}
function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo, listings: state.listing.listings};
}
export default connect(mapStateToProps, actions)(Listing);
