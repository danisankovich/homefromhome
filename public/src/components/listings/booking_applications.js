import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { browserHistory } from 'react-router';

class BookingApplications extends Component {
  componentWillMount() {
    this.setState({shownAppId: ''})
  }
  handleClick() {
    this[0].state.shownAppId === this[1].applicationId
      ? this[0].setState({shownAppId: '', shownApp: ''})
      : this[0].setState({shownAppId: this[1].applicationId, shownApp: this[1]})
  }
  render() {
    const applications = this.props.applications
    return (
      <div>
        {this.state.shownAppId === '' && applications && applications.length > 0 && <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Listing Title</th>
              <th>Listing Country</th>
              <th>Planned Date of Arrival</th>
              <th>Planned Date of Departure</th>
              <th>Reviewed</th>
              <th>Approved</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(function(result) {
              return (
                <tr key={result.applicationId} className='table-row'>
                  <td onClick={this.handleClick.bind([this, result])}>{result.listingTitle}</td>
                  <td onClick={this.handleClick.bind([this, result])}>{result.listingLocation.country}</td>
                  <td onClick={this.handleClick.bind([this, result])}>{result.arrivalDate}</td>
                  <td onClick={this.handleClick.bind([this, result])}>{result.departureDate}</td>
                  <td onClick={this.handleClick.bind([this, result])}>{result.reviewed ? 'Yes' : 'No'}</td>
                  <td onClick={this.handleClick.bind([this, result])}>{result.approved ? 'Yes' : result.approved === 'rejected' ? 'Rejected' : 'No'}</td>
              </tr>
              )
            }.bind(this))}
          </tbody>
        </table>}
        {this.state.shownAppId.length > 0 && <div>
          <ul>
            <li>Applicant's Name: {this.state.shownApp.firstName} {this.state.shownApp.lastName}</li>
            <li>Username: {this.state.shownApp.username}</li>
            <li>Country: {this.state.shownApp.listingLocation.country}</li>
            {this.state.shownApp.listingLocation.country === 'united states' && <div>
              <li>City: {this.state.shownApp.listingLocation.usCity}</li>
              <li>State: {this.state.shownApp.listingLocation.city}</li>
              </div>
            }
            {this.state.shownApp.listingLocation.country !== 'united states' &&
              <li>City: {this.state.shownApp.listingLocation.city}</li>
            }
            <li>Address: {this.state.shownApp.listingLocation.address}</li>
            <li>Arrival Date: this.state.shownApp.arrivalDate</li>
            <li>Departure Date: this.state.shownApp.departureDate</li>
            <li>
              <h4>Message: </h4>
              <p>{this.state.shownApp.message}</p>
            </li>
          </ul>
          <button onClick={this.handleClick.bind([this, this.state.shownApp])}> Return</button>
        </div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo};
}
export default connect(mapStateToProps, actions)(BookingApplications);
