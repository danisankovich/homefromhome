import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { browserHistory } from 'react-router'


class BlogList extends Component {

  render() {

    return (
      <div className="col-sm-12">
        <div className="col-sm-10 col-sm-offset-1">
          This is where blogs are listed
        </div>
      </div>
    );
  }
}
module.exports = BlogList
