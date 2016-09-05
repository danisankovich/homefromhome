import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import { reduxForm } from 'redux-form';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editEmail: false,
      editPhone: false,
      editUser: false,
    };
  }
  // handle hide/show clicks
  handleClick(type) {
     this.setState(type);
     console.log(Object.keys(type)[0])
     if (Object.keys(type)[0] === 'editUser') {
       this.setState({username: this.props.userInfo.userName})
     }
  }
  onEmailChange(event) {
    console.log(event.target.value)
    this.props.userInfo.username =+ event.target.value
  }
  componentWillMount() {
    this.props.fetchInfo();
  }
  handleFormSubmit(formProps) { //called with props from submit form
    this.props.editPhoneNumber(formProps, this.props.userInfo._id);
    this.props.fetchInfo();
    this.setState({editPhone: false})
  }
  render() {
    const { handleSubmit, fields: {phoneNumber}} = this.props;

    let {userInfo} = this.props;
    if(userInfo) {
      return (
        <div>
          <h3>Settings</h3>
          <p>Edit User Info: </p>
          <ul>
            <li>
              Username: {this.props.userInfo.username}
            </li>
            <li
              className={this.state.editPhone ? 'hidden' : ''}
              onClick={function(){
                this.handleClick({editPhone: true})
              }.bind(this)}>
              Phone Number: {this.props.userInfo.phoneNumber || 'Set Number'}
            </li>
            <li className={this.state.editPhone ? '' : 'hidden'}>
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                  <label>Phone Number: </label>
                  <input className="form-control" {...phoneNumber}/>
                </fieldset>
                <button type='button'
                  onClick={function(){
                    this.handleClick({editPhone: false})
                  }.bind(this)}>
                  hide
                </button>
                <button action="submit" className="btn btn-primary">Sign Up</button>
              </form>
            </li>
          </ul>
        </div>
      );
    }
    return (
      <div>Loading........ </div>
    );
  };
}
function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo};
}

export default reduxForm({
  form: 'settings',
  fields: ['email', 'phoneNumber'],
}, mapStateToProps, actions)(Settings);
