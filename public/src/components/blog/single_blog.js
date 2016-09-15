import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { browserHistory } from 'react-router'


class SingleBlog extends Component {
  componentWillMount() {
    let id = this.props.location.pathname.split('blogs/')[1]
    this.props.fetchSingleBlog(id);
  }
  render() {
    let {blog, userInfo} = this.props;
    console.log(blog)
    if(blog) {
      return (
        <div className='toppush container'>
          <div className='row'>
            <div className='col-sm-8 col-sm-offset-2'>
              <h1>{blog.title}   --    by {blog.creator.username}</h1>
              <h3>{blog.tagline}</h3>
              <p>{blog.body}</p>
            </div>
          </div>

        </div>
      )
    } else {
      return (
        <div className='toppush'>LOADING ....... </div>
      )
    }

  };
}
function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo, blog: state.blogs.blog};
}
export default connect(mapStateToProps, actions)(SingleBlog);
