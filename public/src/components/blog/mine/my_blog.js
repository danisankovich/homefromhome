import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import { browserHistory } from 'react-router'
import {Link} from 'react-router';


class MyBlog extends Component {

  render() {

    return (
      <div className="col-sm-12 toppush">
        <div className="col-sm-10 col-sm-offset-1">
          This is where my blog stuff will go
        </div>
        <Link to="/blogs/mine/new"><button className="btn btn-success">Post New Blog Article</button></Link>
      </div>
    );
  }
}
module.exports = MyBlog
