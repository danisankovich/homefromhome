import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from '../../actions';
import SingleMessageChain from './single_message_chain';
import $ from 'jquery';

//Messaging PAGE
class MyMessageChain extends Component {
  componentWillMount() {
    this.setState({renderedMessage: {}})
  }
  handleResponse(data) {
    this.setState({renderedMessage: data});
  }

  render() {
    const {userInfo} = this.props
    const {renderedMessage} = this.state || {}
    return (
      <div className="col-sm-12">
        <div className="col-sm-3 chainList">
          {userInfo && userInfo.messagesChainIds.map((message) => {
            return (
              <div key={message}>
                <SingleMessageChain handleResponse={this.handleResponse.bind(this)}
                  userInfo={userInfo}
                  message={message}
                />
              </div>
            )
          })}
        </div>
        <div className="col-sm-9">
          {renderedMessage && renderedMessage.messages && renderedMessage.messages.map((message) => {
            return (
              <div
                className={(message.senderId === userInfo._id
                  ? "col-sm-6 col-sm-offset-1"
                  : "col-sm-6 col-sm-offset-4") + " messagepush"}
                key={message.dateSent}
                dangerouslySetInnerHTML={{__html: message.message}}
              >
              </div>
            )
          })}
        </div>
      </div>
    );
  };
}
module.exports = MyMessageChain;
