import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { browserHistory } from 'react-router'
import ReactMarkdown from 'react-markdown';
import { reduxForm } from 'redux-form';
import $ from 'jquery';

class SingleBlog extends Component {
  componentWillMount() {
    let id = this.props.location.pathname.split('blogs/')[1]
    this.props.fetchSingleBlog(id);
  }
  componentWillReceiveProps(nextProps) {
    let id = this.props.location.pathname.split('blogs/')[1]
    if (this.props.blog && id && id !== this.props.blog.blog._id) {
      this.props.fetchSingleBlog(id)
    }
  }
  toBlog() {
    browserHistory.push(`/blogs/${this[1]}`)
    this[0].props.fetchSingleBlog(this[1]);
  }
  handleFormSubmit(formProps) { //called with props from submit form
    var data = formProps
    let id = this.props.location.pathname.split('blogs/')[1]
    data.username = this.props.userInfo.username;
    data.userId = this.props.userInfo._id;
    data.comments = [];
    $.ajax({
       url: `/api/blogs/newComment/${id}`,
       type: "POST",
       data: data
    }).done((response) => {
      this.props.fetchSingleBlog(id);
    }).fail((err) => {
      console.log(err)
    });
  }
  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Error!!! </strong> {this.props.errorMessage}
        </div>
      )
    }
  }
  render() {
    const { handleSubmit, blog, userInfo, fields: { comment }} = this.props;
    // let {blog, userInfo} = this.props;
    if(blog && blog.blog) {
      return (
        <div className='toppush container'>
          <div className='row'>
            <div className='col-sm-8 col-sm-offset-2'>
              <h1>{blog.blog.title}   --    by <a onClick={() => {browserHistory.push(`/userprofile/${blog.blog.creator.id}`)}}>{blog.blog.creator.username}</a></h1>
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
          <hr />
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2">
              <p>Comments: </p>
              {this.props.userInfo &&
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                  <label>New Comment: </label>
                  <textarea id="commentBlog" className="form-control" type="text" {...comment}></textarea>
                  {comment.touched && comment.error && <div className="error">{comment.error}</div>}
                  {this.renderAlert()}
                  <button action="submit" className="btn btn-primary">Submit</button>
                </form>
              }
              <div id='Comment-Section'>
                <ul>
                  {blog.blog.comments.map((comment) => {
                    return <li className="commentBlock" key={comment._id}>
                      <h4>{comment.username} at {comment.dateCreated}</h4>
                      <hr />
                      <p>{comment.comment}</p>
                    </li>
                  })}
                </ul>
              </div>
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

function validate(formProps) {
  const errors = {};

  if (!formProps.comment) {
    errors.comment = 'Do Not Submit Without Supplying a Comment First';
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    blog: state.blogs.blog,
    userInfo: state.auth.userInfo
  };
}

export default reduxForm({
  form: 'newBlog',
  fields: ['comment'],
  validate,
}, mapStateToProps, actions)(SingleBlog);
