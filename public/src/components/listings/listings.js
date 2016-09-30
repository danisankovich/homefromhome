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
    this.setState({city: ''})
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
              return (
                <tr key={result._id} onClick={this.handleClick.bind(result)}>
                  <td>{result.title}</td>
                  <td>{result.location.country}</td>
                  <td>{result.location.city}</td>
                  {result.location.usCity !== 'not valid' && <td>{result.location.usCity}</td>}
                  <td>{result.location.address}</td>
                  <td>${result.pricePerNight}</td>
                  <td>rating</td>
                </tr>
              )
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
