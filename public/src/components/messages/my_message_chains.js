import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from '../../actions';
import SingleMessageChain from './single_message_chain';
import $ from 'jquery';

//Messaging PAGE
class MyMessageChains extends Component {
  render() {
    const {userInfo} = this.props
    return (
      <div>
        {userInfo && userInfo.messagesChainIds.map((message) => {
          return (
            <SingleMessageChain userInfo={userInfo} message={message} key={message}/>
          )
        })}
      </div>
    );
  };
}
module.exports = MyMessageChains;
