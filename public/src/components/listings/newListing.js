import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';


class NewListing extends Component {
  constructor() {
    super()
    this.state = {
      file: ''
    }
  }
  handleFormSubmit(formProps) { //called with props from submit form
    var data = formProps
    data.image = this.state.file
    data.username = this.props.userInfo.username;
    data.id = this.props.userInfo._id;
    data.phoneNumber = this.props.userInfo.phoneNumber;
    data.email = this.props.userInfo.email;
    this.props.newListing(data);
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
  previewFile() {
    var self = this;
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
    var image;
    reader.addEventListener("load", function () {
      image = reader.result;
      self.setState({file: image})
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }

  }
  render() {
    const { handleSubmit, userInfo, fields: {city, country, address, image, pricePerNight, availableForRent, datesAvailable }} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>City: </label>
          <input className="form-control" {...city} />
        </fieldset>
        <fieldset className="form-group">
          <label>Country: </label>
          <input className="form-control" {...country} />
        </fieldset>
        <fieldset className="form-group">
          <label>Address: </label>
          <input className="form-control" type="text" {...address} />
        </fieldset>
        <fieldset className="form-group">
          <input type="file" onChange={this.previewFile.bind(this)} />
        </fieldset>
        <fieldset className="form-group">
          <label>Price Per Night: </label>
          <input className="form-control" type="text" {...pricePerNight} />
        </fieldset>
        <fieldset className="form-group">
          <label>Currently Available?: </label>
          <input className="form-control" type="text" {...availableForRent} />
        </fieldset>
        <fieldset className="form-group">
          <label>Dates Available: </label>
          <input className="form-control" type="text" {...datesAvailable} />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  // if (!formProps.email) {
  //   errors.email = 'Please Enter Your Email';
  // }
  // if (!formProps.username) {
  //   errors.username = 'Please Enter Your Username';
  // }
  // if (!formProps.password) {
  //   errors.password = 'Please Enter a Password';
  // }
  // if (!formProps.passwordConfirm) {
  //   errors.passwordConfirm = 'Please Re-enter the Password';
  // }
  //
  // if(formProps.password !== formProps.passwordConfirm) {
  //   errors.password = 'Passwords must match';
  // }
  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    userInfo: state.auth.userInfo
  };
}

export default reduxForm({
  form: 'newListing',
  fields: ['image', 'pricePerNight', 'availableForRent', 'datesAvailable', 'city', 'country', 'address'],
  validate,
}, mapStateToProps, actions)(NewListing);
