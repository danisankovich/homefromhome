import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import city_states from '../../../../locations/cities';
import states from '../../../../locations/states';
import countries from '../../../../locations/countries';
import us_cities_by_state from '../../../../locations/us_cities';
class ListingSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {country: '', city: '', searchParameters: {}}
  }
  changeCountry(event) {
    this.setState({country: event.target.value});
    this.setState({city: '', usCity: ''})
  }
  changeCity(event) {
    this.setState({city: event.target.value, usCity: ''});
  }
  changeUsCity(event) {
    this.setState({usCity: event.target.value});
  }
  cityCountrySearch() {
    this.props.fetchListings(`${this.state.country}_${this.state.city}_${this.state.usCity}`, this.state.searchParameters)
  }
  render() {
    let incrementKey = 0

    const cityCountrySearch = this.cityCountrySearch;
    let citiesorstates = [];
    if (this.state.country) {
      if (!city_states[this.state.country]) {
        alert('Sorry. We do not provide services in that country');
      } else {
        citiesorstates = city_states[this.state.country].split('|');
      }
    }
    let usCities;
    if(this.state.country && this.state.country === 'United States' && this.state.city && this.state.city.length > 0) {
      let usState = this.state.city.toUpperCase();
      usCities = us_cities_by_state[usState]
    }
    return (
      <div className='col-sm-12'>
        <div className='col-sm-1'><label className='searchLabel'>Country: </label></div>
        <div className='col-sm-3'>
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
        {this.state.country && <div className='col-sm-3'>
          <select className="form-control" onChange={this.changeCity.bind(this)}>
            {this.state.country === 'United States' && <option key="default">Pick A State</option>}
            {this.state.country !== 'United States' && <option key="default">Pick A City</option>}
            {citiesorstates.map((e) => {
              if(e.length > 0) return <option key={incrementKey+=1} value={e}>{e}</option>
            })}
          </select>
        </div>}
        {this.state.country &&
          this.state.country === 'United States' &&
          this.state.city &&
          (this.state.city.length > 0) && <div>
            <div className='col-sm-1'>
              <label className='searchLabel'>Country: </label>
            </div>
            <div className='col-sm-3'>
              <fieldset className="form-group">
                <select className="form-control" onChange={this.changeUsCity.bind(this)}>
                  <option key="default">Pick A City</option>
                  {usCities.map((e) => {
                    if(usCities.length > 0) return <option key={incrementKey+=1} value={e}>{e}</option>
                  })}
                </select>
              </fieldset>
            </div>
          </div>
        }
        {this.state.country && <div className='col-sm-12'>
          <form>
            <div className='col-sm-4'>
              <fieldset>

                <label>Min Price: </label>
                <input
                  className="form-control"
                  type="number"
                  min="0.01"
                  step="0.01"
                  max="4999.99"
                  placeholder="Minimum Price"
                  onChange={(e) => {this.state.searchParameters.minPrice = e.target.value}}
                />
              </fieldset>
            </div>
            <div className='col-sm-4'>
              <fieldset>
                <label>Max Price: </label>
                <input
                  className="form-control"
                  type="number"
                  min="0.02"
                  step="0.01"
                  max="5000.00"
                  placeholder="Maximum Price"
                  onChange={(e) => {this.state.searchParameters.maxPrice = e.target.value}}
                />
              </fieldset>
            </div>
            <div className='col-sm-4'>
              <fieldset>
                <label>Min Rating: </label>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  step=".5"
                  max="5"
                  placeholder="Minimum Rating"
                  onChange={(e) => {this.state.searchParameters.minRating = e.target.value}}
                />
              </fieldset>
            </div>
          </form>
        </div>}
        <div className='col-sm-2'>
          <button className='btn btn-primary' onClick={this.cityCountrySearch.bind(this)}>Search City</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {listings: state.listing.listings};
}
export default connect(mapStateToProps, actions)(ListingSearch);
