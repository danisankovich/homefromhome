import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { browserHistory } from 'react-router'
import _ from 'lodash';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }
  componentWillMount() {
    this.setState({
      listings: []
    })
    this.props.fetchInfo();
    this.props.fetchListings();
  }
  onInputChange(term) {
    this.setState({term});
  }
  handleClick() {
    let clickResult = this._id;
    browserHistory.push(`/listings/${clickResult}`);
  }
  cityCountrySearch() {
    var term = this.state.term;
    var places = this.props.listings.filter(function(e) {
      return e.location.country === term || e.location.city === term;
    })
    this.setState({listings: places})
  }
  render() {
    const cityCountrySearch = this.cityCountrySearch;
    let {userInfo} = this.props;
    return (
      <div>
        <div className='col-sm-8'>
          <input placeholder='Enter Your Search Terms' className="form-control" id='searchBar'
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value)}/>
          <button onClick={this.cityCountrySearch.bind(this)}>Submit</button>
        </div>
        {this.state.listings.map(function(result) {
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
