import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Listing extends Component {
  componentWillMount() {
    this.props.fetchInfo();
  }
  render() {
    let {userInfo} = this.props;
    if(userInfo) {
      return (
        <div className="col-sm-4">
          <div className='listingBorder'>
            <h3>Listing 1</h3>
            LISTING: STUFF here
            <h2>NAME</h2>
            <p>MORE STUFF</p>
            <p>AND MORE</p>
          </div>
          <br />
        </div>
      );
    }
    return (
      <div>Loading...... </div>
    );
  };
}
function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo};
}
export default connect(mapStateToProps, actions)(Listing);
