import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { browserHistory } from 'react-router'


class BasicInfo extends Component {

  render() {

    return (
      <div className="col-sm-12">
        <div className="col-sm-10 col-sm-offset-1">
          <select name="country" className="countries" id="countryId">
          <option value="">Select Country</option>
          </select>
          <select name="state" className="states" id="stateId">
          <option value="">Select State</option>
          </select>
          <select name="city" className="cities" id="cityId">
          <option value="">Select City</option>
          </select>
        </div>
      </div>
    );
  }
}
module.exports = BasicInfo
