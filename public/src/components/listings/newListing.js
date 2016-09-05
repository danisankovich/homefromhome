import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class newListing extends Component {
  handleFormSubmit(formProps) { //called with props from submit form
    this.props.submitListing(formProps);
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
    const { handleSubmit, fields: {email, username, password, passwordConfirm }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email: </label>
          <input className="form-control" {...email} />
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Username: </label>
          <input className="form-control" {...username} />
          {username.touched && username.error && <div className="error">{username.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password: </label>
          <input className="form-control" type="password" {...password} />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password: </label>
          <input className="form-control" type="password" {...passwordConfirm} />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please Enter Your Email';
  }
  if (!formProps.username) {
    errors.username = 'Please Enter Your Username';
  }
  if (!formProps.password) {
    errors.password = 'Please Enter a Password';
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please Re-enter the Password';
  }

  if(formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }
  return errors;
}

function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

export default reduxForm({
  form: 'newListing',
  fields: ['image', 'pricePerNight', 'availableForRent', 'datesAvailable', 'city', 'country', 'address'],
  validate,
}, mapStateToProps, actions)(Signup);
