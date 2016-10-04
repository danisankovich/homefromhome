import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import { browserHistory } from 'react-router'

class TableListing extends Component {
  handleClick() {
    let clickResult = this._id;
    browserHistory.push(`/listings/${clickResult}`);
  }
  render() {
    const {result } = this.props
    return (
        <tr key={result._id} onClick={this.handleClick.bind(result)} className='table-row'>
          <td>{result.title}</td>
          <td>{result.location.country}</td>
          {result.location.country === 'united states' && <td>{result.location.city}</td>}
          {result.location.country !== 'united states' && <td>X</td>}
          {result.location.usCity !== 'not valid' && <td>{result.location.usCity}</td>}
          {result.location.usCity === 'not valid' && <td>{result.location.city}</td>}
          <td>{result.location.address}</td>
          <td>${result.pricePerNight}</td>
          <td>rating</td>
        </tr>
    )
  };
}

module.exports = TableListing;
