import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../../actions';


class NewBlog extends Component {
  constructor() {
    super()
    this.state = {
      file: ''
    }
  }
  handleFormSubmit(formProps) { //called with props from submit form
    var data = formProps
    data.username = this.props.userInfo.username;
    data.id = this.props.userInfo._id;
    data.image = []
    this.props.newBlog(data);
  }
  componentWillMount() {
    this.props.fetchInfo();
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
    const { handleSubmit, userInfo, fields: { tagline, title, body }} = this.props;
    return (
      <div className='toppush'>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>Title: </label>
            <input className="form-control" type="text" {...title} />
            {title.touched && title.error && <div className="error">{title.error}</div>}
          </fieldset>
          <fieldset className="form-group">
            <label>Tagline: </label>
            <input className="form-control" type="text" {...tagline} />
            {tagline.touched && tagline.error && <div className="error">{tagline.error}</div>}
          </fieldset>
          <fieldset className="form-group">
            <label>Body: </label>
            <input className="form-control" type="text" {...body} />
            {body.touched && body.error && <div className="error">{body.error}</div>}
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Post Blog</button>
        </form>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.title) {
    errors.title = 'Please Enter a Title';
  }
  if (!formProps.tagline) {
    errors.tagline = 'Please Enter a Tagline';
  }
  if (!formProps.body) {
    errors.body = 'Please Enter a Body for your Blog';
  }
  if (formProps.body && formProps.body.length < 200) {
    errors.body = 'Blog post must be at least 200 characters'
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    userInfo: state.auth.userInfo
  };
}

export default reduxForm({
  form: 'newBlog',
  fields: ['image', 'body', 'title', 'tagline'],
  validate,
}, mapStateToProps, actions)(NewBlog);
