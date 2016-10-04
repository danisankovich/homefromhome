import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { browserHistory } from 'react-router'


class BlogList extends Component {
  componentWillMount() {
    this.props.fetchAllBlogs();
  }
  render() {
    let {userInfo, blogs} = this.props;
    if(blogs && blogs.length) {
      return (
        <div className="col-sm-12">
          <div className="col-sm-10 col-sm-offset-1">
            <div className="col-sm-12">
              {blogs.map((e) => {
                return (
                  <div className="col-sm-3" key={e._id} onClick={() => {browserHistory.push(`/blogs/${e._id}`)}}>
                    <ul className="blogListingBorder">
                      <li>{e.title}</li>
                      <li>{e.tagline}</li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return <div className="toppush"><h1>LOADING........</h1></div>
    }

  }
}
function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo, blogs: state.blogs.blogs};
}
export default connect(mapStateToProps, actions)(BlogList);
