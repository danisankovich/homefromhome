import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class SearchBar extends Component {
  constructor(props) {
    super(props); //calls the parent method from Component (a lower level class)
    this.state = { term: '' };
  }
  render() {

    return (
      <div className='col-sm-12'>
        <div className='col-sm-8 col-sm-offset-1'>
          <input placeholder='Enter Your Search Terms' className="form-control searchInput" id='searchBar'
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value)}/>
        </div>
        <div className='col-sm-3'>
          <button className='btn btn-primary' onClick={() => dispatch(this.props.cityCountrySearch.bind(this))}>Search City/Country</button>
        </div>
      </div>

    )
  }

  onInputChange(term) {
    this.setState({term});
    // this.props.onSearchTermChange(term)
  }
}

function mapStateToProps(state) {
  return {listings: state.listing.listings};
}
export default connect(mapStateToProps, actions)(SearchBar);
