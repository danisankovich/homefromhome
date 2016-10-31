import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from '../../actions';
import $ from 'jquery';

//Messaging PAGE
class MyMessageChains extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
  }
  componentWillMount() {
    $.ajax({
       url: `/api/messages/${this.props.message}`,
       type: "GET",
    }).done((response) => {
      this.setState({messageChain: response});
    }).fail((err) => {
      console.log(err)
    });
  }
  render() {
    const {messageChain} = this.state || []
    const {userInfo} = this.props
    return (
      <div className="borderBottom">
        {
          messageChain &&
          <h3>Username: {userInfo.username === messageChain.usernames[0]
              ? messageChain.usernames[1]
              : messageChain.usernames[0]
            }
          </h3>
        }
      </div>
    );
  };
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    userInfo: state.auth.userInfo
  };
}
export default connect(mapStateToProps, actions)(MyMessageChains);
