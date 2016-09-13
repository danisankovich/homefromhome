import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import { reduxForm } from 'redux-form';
import PhotoBook from './photobook';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editEmail: false,
      editPhone: false,
      editUser: false,
      editLang: false,
      selectedLanguages: []
    };
  }
  componentWillMount() {
    this.props.fetchInfo();
  }
  // handle hide/show clicks
  handleClick(type) {
     this.setState(type);
     if (Object.keys(type)[0] === 'editUser') {
       this.setState({username: this.props.userInfo.userName})
     }
  }
  onEmailChange(event) {
    this.props.userInfo.username =+ event.target.value
  }

  handleFormSubmitPhoneNumber(formProps) { //called with props from submit form
    this.props.editUser(formProps, this.props.userInfo._id);
    this.props.fetchInfo();
    this.setState({editPhone: false})
  }
  handleFormSubmitEmail(formProps) { //called with props from submit form
    this.props.editUser(formProps, this.props.userInfo._id);
    this.props.fetchInfo();
    this.setState({editEmail: false})
  }
  handleLangClick(formProps) {
    formProps.lang = this.state.selectedLanguages;

    this.props.editUser(formProps, this.props.userInfo._id);
    this.props.fetchInfo();
  }
  render() {
    let self = this;
    const { handleSubmit, fields: {phoneNumber, email, lang}} = this.props;

    let {userInfo} = this.props;
    let languages = [
      'English', 'Español', 'Français', '日本語', 'Italiano', 'Deutsch', 'Русский язык',
      '中文', '한국어', 'دزيري / جزائري', 'Português', 'Kiswahili', 'Polish'
    ]
    let currentLangs;
    if(userInfo) {
      currentLangs = userInfo.languages;
    }
    if(userInfo) {
      return (
        <div className="toppush">
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
              <form onSubmit={handleSubmit(this.handleFormSubmitPhoneNumber.bind(this))}>
                <fieldset className="form-group">
                  <label>Phone Number: {this.props.userInfo.phoneNumber}</label>
                  {phoneNumber.touched && phoneNumber.error && <div className="error">{phoneNumber.error}</div>}
                  <input className="form-control" {...phoneNumber}/>
                </fieldset>
                <button type='button' className="btn btn-danger"
                  onClick={function(){
                    this.handleClick({editPhone: false})
                  }.bind(this)}>
                  hide
                </button>
                <button action="submit" className="btn btn-primary">Save</button>
              </form>
            </li>
            <li
              className={this.state.editEmail ? 'hidden' : ''}
              onClick={function(){
                this.handleClick({editEmail: true})
              }.bind(this)}>
              Email: {this.props.userInfo.email}
            </li>
            <li className={this.state.editEmail ? '' : 'hidden'}>
              <form onSubmit={handleSubmit(this.handleFormSubmitEmail.bind(this))}>
                <fieldset className="form-group">
                  <label>Email: {this.props.userInfo.email}</label>
                  {email.touched && email.error && <div className="error">{email.error}</div>}
                  <input className="form-control" {...email}/>
                </fieldset>
                <button type='button' className="btn btn-danger"
                  onClick={function(){
                    this.handleClick({editEmail: false})
                  }.bind(this)}>
                  hide
                </button>
                <button action="submit" className="btn btn-primary">Save</button>
              </form>
            </li>
            <li
              className={this.state.selectedLanguages ? '' : 'hidden'}
              onClick={function(){
                $('#myModal').modal('show');
              }}>
              Languages: {
                this.props.userInfo.languages.map((lang, i) => {
                  if (i === this.props.userInfo.languages.length -1) {
                    return lang;
                  }
                  return lang + ', '
                })
              }
            </li>
          </ul>

          <PhotoBook />

          <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h4 className="modal-title" id="myModalLabel">Languages</h4>
                </div>
                <div className="modal-body">
                  <form>
                    {languages.map((lang) => {
                      let isChecked;
                      if (currentLangs.indexOf(lang) > -1) {
                        isChecked=true;
                        if(this.state.selectedLanguages.indexOf(lang) === -1) {
                          this.state.selectedLanguages.push(lang)
                        }
                      }
                      return (
                        <div key={lang} className='langDiv col-sm-6' >
                          <label htmlFor={lang}> {lang} </label>
                          <input type="checkbox" id={lang} value={lang} defaultChecked={isChecked}
                            onChange={()=>{
                              if (currentLangs.indexOf(lang) === -1) {
                                currentLangs.push(lang)
                              } else {
                                currentLangs.splice(currentLangs.indexOf(lang), 1)
                              }
                              this.state.selectedLanguages = currentLangs
                            }} />
                        </div>
                    )
                    })}
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit(self.handleLangClick.bind(self))} data-dismiss="modal">Save changes</button>
                </div>
              </div>
            </div>
          </div>
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
  fields: ['email', 'phoneNumber', 'lang'],
}, mapStateToProps, actions)(Settings);
