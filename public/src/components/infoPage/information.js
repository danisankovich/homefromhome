import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Information extends Component {
  componentWillMount() {
    this.props.fetchInfo();
  }
  render() {
    let {userInfo} = this.props;
    if(userInfo) {
      return (
        <div className='container toppush'>
          <h1>Information</h1>
          <p className="infoPara">Are you ready to find your home away from home? Then you've come to the right place. Whether you
          are looking for a place to stay for a night or two, or if you are looking for a homestay experience,
          reach out to your fellow users and see what they have to offer.</p>
          <p className="infoPara">Don't know where to begin? Not sure if you are quite ready to travel? Head on over to our blog sections to read
          up on the experiences and lessons of your fellow users. Still not finding what you are looking for? Feel free to contact users directly.
          But make sure to be curteous. We are a community of travel-hungry beings.</p>
          <p className="infoPara">So don't be shy. There is a whole community of people just like you, eagerly awaiting their next journey. And a network of people
          willing to open up their doors to weary travellers.</p>
          <div className="borderBottom"></div>

          <h2>F.A.Q</h2>
          <h3>Q: <span>How much does this service cost?</span></h3>
          <h3>A: <span>Not a thing. The only cost you will pay is booking fees.
            We make money by taking a very small cut from booking fees.
          </span></h3>
        <div className="borderBottom"></div>
          <h3>Q: <span>How old do I have to be to book a place?</span></h3>
          <h3>A: <span>You must be at least 18 years old to book a location. However,
            depending on the policies of the location's owner, younger guests may be allowed,
            so long as a parent or legal guardian okays the purchase.
          </span></h3>
        <div className="borderBottom"></div>
          <h3>Q: <span>What if I want to be a host?</span></h3>
          <h3>A: <span>You will have to agree to our <a>Hosting Terms and Conditions</a>, at which point
            you will be able to post a listing. This lays out guidelines for basic rules of cleanliness,
            responsibilities, etc.
          </span></h3>
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
export default connect(mapStateToProps, actions)(Information);
