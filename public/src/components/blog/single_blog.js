import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { browserHistory } from 'react-router'
import ReactMarkdown from 'react-markdown';

class SingleBlog extends Component {
  componentWillMount() {
    let id = this.props.location.pathname.split('blogs/')[1]
    this.props.fetchSingleBlog(id);
  }
  toBlog() {
    browserHistory.push(`/${this[1]}`)
    this[0].props.fetchSingleBlog(this[1]);
  }
  render() {
    let {blog, userInfo} = this.props;
    if(blog && blog.blog) {
      return (
        <div className='toppush container'>
          <div className='row'>
            <div className='col-sm-8 col-sm-offset-2'>
              <h1>{blog.blog.title}   --    by {blog.blog.creator.username}</h1>
              <h3>{blog.blog.tagline}</h3>
              <ReactMarkdown className='body-spacing' source={blog.blog.body} />
            </div>
            <div className='col-sm-2'>
              <ul>
                {blog.blogList.map((blogEntry) => {
                  return (
                    <li key={blogEntry._id}>
                      <ul className='borderBottom'>
                        <li className="removeListBullet">{blogEntry.dateCreated.split('T')[0]}</li>
                        <li className="removeListBullet" onClick={this.toBlog.bind([this, blogEntry._id])}>{blogEntry.title}</li>
                      </ul>
                    </li>
                  )
                })}
              </ul>
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
