import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import $ from 'jquery';
import { browserHistory } from 'react-router'; // commits info about url to react router, and to make changes to url

//WELCOMING PAGE
class Agreement_Container extends Component {
  componentWillMount() {
    if (this.props.userInfo && this.props.userInfo.hostUserAgreementSigned) {
      browserHistory.push('/listings')
    }
    this.setState({agreed: false});
  }
  submitAgreement(e) {
    e.preventDefault();
    var token = localStorage.getItem('token')
    if(this.state.agreed) {
      $.ajax({
        url: '/api/agree',
        type: "PUT",
        headers: {
          "authorization": token
        },
        data: {agreeType: 'host', agreed: true}
      }).success((e) => {
        alert('Form Successfully Signed. Thank You');
        browserHistory.push('/listings')
        this.props.fetchInfo()
      }).fail((e) => {
        alert('something went wrong', e)
      })
    } else {
      alert('You must agree to the terms and conditions')
    }
  }
  render() {
    return (
      <div>
        <p>
          The following document lays out the terms and conditions for becoming a
          host for Home Away From Home. Agreeing to these terms grants the privelage
          of becoming a Host, but understand that these terms can change at any time,
          and that it will be at the discretion of the Home Away From Home moderators
          should action be taken against those who break the terms of this agreement.
        </p>
        <h3>Health and Safety Standards: </h3>
        <ol>
          <li>
            All residences listed for booking must follow all safety and health codes
            for the country in which they are located.
          </li>
          <li>
            All residences listed for booking must be free of pests.
          </li>
          <li>
            All residences listed must make note of any pets, allergens, or allergy restrictions.
            Should any of such be unmentioned, the guest will be payed back in full, and you will
            be charged a convenience fee of 5% of the full booking price.
          </li>
          <li>
            You are required to provide proper and clean accomodations for your guests, which should be described
            within your listing. You are not required to provide a private room for your guests, nor are you required
            to give them a pick of rooms, so long as the rooms mentioned in your listing are still available. should
            they attempt to break this rule, the user will be responsible should you choose to cancel the agreement.
          </li>
        </ol>
        <h3>Payment: </h3>
        <ol>
          <li>You may not charge guests more than what the property was listed for</li>
          <li>You will pay 2% of the total price of the stay to Home Away From Home</li>
          <li>You are not required to supply food for guests.</li>
        </ol>
        <h3>Misconduct: </h3>
        <ol>
          <li>You will not engage in an unwarranted sexual activity or conversation with the guests.</li>
          <li>Should your guests be below the legal age of consumption, you will not provide them with:
            <ul>
              <li>Alcohol</li>
              <li>Tobacco</li>
              <li>Other recreational substances</li>
              <li>Any other as of yet unmentioned substance or article with an age restriction of which they do not meet in the host country</li>
            </ul>
          </li>
        </ol>
        <p>
          Failure to follow the preceding agreements can result in fines, suspensions, removal of account,
          or, under certain legal circumstances, a filing of a report to the local authorities.
        </p>
        <p>
          Agreeing to these terms consitutes a binding legal contract, and an agreement that you, the user and host,
          have read and understand the provisions layed out within this document.
        </p>
        <div>
          <form className="form-group" onSubmit={this.submitAgreement.bind(this)}>
            <fieldset>
              <label>I agree to these terms and conditions:
                <input type="checkbox" onChange={() => {
                    this.state.agreed === true ? this.state.agreed = false : this.state.agreed = true;
                    console.log(this.state.agreed)
                  }
                }/>
              </label>
              <button type='submit'>Submit</button>
            </fieldset>
          </form>

        </div>
      </div>
    );
  };
}
function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo};
}
export default connect(mapStateToProps, actions)(Agreement_Container);
