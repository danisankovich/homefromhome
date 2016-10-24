import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import HostAgreement from './host_agreement';
//WELCOMING PAGE
class Agreement_Container extends Component {
  componentWillMount() {
    console.log();
  }
  render() {
    let agreementToRender = this.props.location.pathname.split('/')[2]
    return (
      <div className='container toppush'>
        <div className="row">
          <div className="col-sm-12">
            <h1 className='text-center'>User Agreement: {agreementToRender.toUpperCase()} Agreement</h1>
            <h2>Please read this document carefully and check "I Agree" at the bottom</h2>
            {agreementToRender === 'host' && <HostAgreement />}
          </div>
        </div>
        <br />
      </div>
    );
  };
}
module.exports = Agreement_Container;
