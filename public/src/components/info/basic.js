import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { browserHistory } from 'react-router'


class BasicInfo extends Component {
  constructor(props) {
    super(props)
    alert('Pardon The Mess. This is a Work In Progress')
  }
  render() {

    return (
      <div className="col-sm-12">
        <div className="col-sm-10 col-sm-offset-1">

        </div>
      </div>
    );
  }
}
module.exports = BasicInfo
