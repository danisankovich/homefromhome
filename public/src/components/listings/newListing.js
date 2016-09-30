import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { browserHistory } from 'react-router'
import city_states from '../../../cities'
import states from '../../../states'
import countries from '../../../countries'

class NewListing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '', city: ''
    }
  }
  handleFormSubmit(formProps) { //called with props from submit form
    var data = formProps
    data.image = this.state.file
    data.username = this.props.userInfo.username;
    data.id = this.props.userInfo._id;
    data.phoneNumber = this.props.userInfo.phoneNumber;
    data.email = this.props.userInfo.email;
    if(data.image.length === 0) {
      alert('Must supply Image');
      return;
    }
    this.props.newListing(data);
    browserHistory.push('/listings')
  }
  changeCountry(event) {
    console.log(event.target.value)
    this.setState({country: event.target.value})
  }
  changeCity(event) {
    console.log(event.target.value)
    this.setState({city: event.target.value})
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
    let x = 0
    let { handleSubmit, userInfo, fields: {city, country, address, image, pricePerNight, availableForRent, datesAvailable }} = this.props;

    let citiesorstates = this.state.country ? city_states[this.state.country].split('|') : [];
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <fieldset className="form-group">
                <label>Country: </label>
                <select className="form-control" onChange={this.changeCountry.bind(this)}>
                  <option key="default">Pick A Country</option>
                  {countries.map((e) => {
                    return <option key={e} value={e}>{e}</option>
                  })}
                </select>
              </fieldset>
              {this.state.country &&
                <fieldset className="form-group">
                  {this.state.country === 'United States' && <label>State: </label>}
                  {this.state.country !== 'United States' && <label>City: </label>}
                  <select className="form-control" onChange={this.changeCity.bind(this)}>
                    {this.state.country === 'United States' && <option key="default">Pick A State</option>}
                    {this.state.country !== 'United States' && <option key="default">Pick A City</option>}
                    {citiesorstates.map((e) => {
                      return <option key={x+=1} value={e}>{e}</option>
                    })}
                  </select>
                </fieldset>
              }
              <fieldset className="form-group">
                <label>Country: </label>
                <input className="form-control" {...country} />
                {country.touched && country.error && <div className="error">{country.error}</div>}
              </fieldset>
              <fieldset className="form-group">
                <label>City: </label>
                <input className="form-control" {...city} />
                {city.touched && city.error && <div className="error">{city.error}</div>}
              </fieldset>
              <fieldset className="form-group">
                <label>Address: </label>
                <input className="form-control" type="text" {...address} />
                {address.touched && address.error && <div className="error">{address.error}</div>}
              </fieldset>
              <fieldset className="form-group">
                <input type="file" onChange={this.previewFile.bind(this)} />
              </fieldset>
              <fieldset className="form-group">
                <label>Price Per Night: </label>
                <input className="form-control" type="text" {...pricePerNight} />
                {pricePerNight.touched && pricePerNight.error && <div className="error">{pricePerNight.error}</div>}
              </fieldset>
              <fieldset className="form-group">
                <h3>Currently Available For Rent?</h3>
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="availableForRent"
                    onChange={availableForRent.onChange}
                    value="true" />Yes:
                </label>
                <label className="radio-inline">
                  <input
                    type="radio"
                    name="availableForRent"
                    onChange={availableForRent.onChange}
                    value="false"/>No:
                </label>
                {availableForRent.touched && availableForRent.error && <div className="error">{availableForRent.error}</div>}
              </fieldset>
              <fieldset className="form-group">
                <label>Dates Available: </label>
                <input className="form-control" type="text" {...datesAvailable} />
                {datesAvailable.touched && datesAvailable.error && <div className="error">{datesAvailable.error}</div>}
              </fieldset>
              {this.renderAlert()}
              <button action="submit" className="btn btn-primary">Add Listing</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.city) {
    errors.city = 'Please Enter a City';
  }
  if (!formProps.country) {
    errors.country = 'Please Enter a Country';
  }
  if (!formProps.address) {
    errors.address = 'Please Enter an Address';
  }
  if (!formProps.pricePerNight) {
    errors.pricePerNight = 'Please Enter Price Per Night';
  }

  if(formProps.datesAvailable !== formProps.datesAvailable) {
    errors.datesAvailable = 'Please enter dates the listing is available';
  }
  if(formProps.availableForRent !== formProps.availableForRent) {
    errors.availableForRent = 'Is the listing currently available for rent?';
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
  form: 'newListing',
  fields: ['image', 'pricePerNight', 'availableForRent', 'datesAvailable', 'city', 'country', 'address'],
  validate,
}, mapStateToProps, actions)(NewListing);
