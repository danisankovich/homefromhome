import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import city_states from '../../../cities';
import states from '../../../states';
import countries from '../../../countries';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = { city: '', country: '', listings: [] };
  }
  componentWillMount() {
    this.props.fetchInfo();
  }
  changeCountry(event) {
    this.setState({country: event.target.value});
  }
  changeCity(event) {
    this.setState({city: event.target.value});
  }
  handleClick() {
    let clickResult = this._id;
    browserHistory.push(`/listings/${clickResult}`);
  }
  cityCountrySearch() {
    console.log(this.state.country, this.state.city)
    this.props.fetchListings(`${this.state.country}_${this.state.city}`)
  }
  render() {
    let incrementKey = 0

    const cityCountrySearch = this.cityCountrySearch;
    let {userInfo} = this.props;
    let listings = [];
    if(this.props.listings) {
      listings = this.props.listings
    }
    let citiesorstates = [];
    if (this.state.country) {
      if (!city_states[this.state.country]) {
        alert('Sorry. We do not provide services in that country');
      } else {
        citiesorstates = city_states[this.state.country].split('|');
      }
    }
    return (
      <div>
        <div className='col-sm-12'>
          <div className='col-sm-1'><label className='searchLabel'>Country: </label></div>
          <div className='col-sm-4'>
            <select className="form-control" onChange={this.changeCountry.bind(this)}>
              <option key="default">Pick A Country</option>
              {countries.map((e) => {
                return <option key={e} value={e}>{e}</option>
              })}
            </select>
          </div>
          <div className='col-sm-1'>
            {this.state.country && citiesorstates.length > 0 && this.state.country === 'United States' && <label className='searchLabel'>State: </label>}
            {this.state.country && citiesorstates.length > 0 && this.state.country !== 'United States' && <label className='searchLabel'>City: </label>}
          </div>
          {this.state.country && <div className='col-sm-4'>
            <select className="form-control" onChange={this.changeCity.bind(this)}>
              {this.state.country === 'United States' && <option key="default">Pick A State</option>}
              {this.state.country !== 'United States' && <option key="default">Pick A City</option>}
              {citiesorstates.map((e) => {
                if(e.length > 0) return <option key={incrementKey+=1} value={e}>{e}</option>
              })}
            </select>
          </div>}
          <div className='col-sm-2'>
            <button className='btn btn-primary' onClick={this.cityCountrySearch.bind(this)}>Search City</button>
          </div>
        </div>
        {listings.map(function(result) {
          return (
            <div className="col-sm-4" key={result._id} onClick={this.handleClick.bind(result)}>
              <div className="listingBorder">
                <h3>{result.title}</h3>
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
