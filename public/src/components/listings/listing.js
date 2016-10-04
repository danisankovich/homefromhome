import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { browserHistory } from 'react-router'
import ReactMarkdown from 'react-markdown';


class SingleListing extends Component {
  componentWillMount() {
    this.setState({listing: '', inputValue: ''})
    let id = this.props.location.pathname.split('listings/')[1]
    this.props.fetchSingleListing(id);
  }
  handleClick(type) {
     this.setState(type);
  }
  handleFormSubmit(e) { //called with props from submit form
    e.preventDefault();
    let listing = this.state.listing
    listing.type = this.state.type
    if(['address', 'city', 'usCity', 'country'].indexOf(listing.type) > -1) {
      listing.location[listing.type] = this.state.inputValue
    } else {
      listing[listing.type] = this.state.inputValue
      if(listing.type === 'pricePerNight' && isNaN(listing[listing.type])) {
        alert('Must supply a valid number');
        return;
      }
    }
    this.props.editListing({listing}, this.props.userInfo._id)
    this.setState({editAddress: false, editusCity: false, editPrice: false})
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
  render() {
    let {listing, userInfo} = this.props;
    if(listing && listing.location) {
      this.state.listing = listing
      return (
        <div>
          <div className="col-sm-10 col-sm-offset-1">
            <div className="">
              <div className="thumbnail">
                <img className="img-responsive center-block"
                  src={listing.image}
                />
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-12">
                  <div className="col-sm-10 col-sm-offset-1">
                    <h3>Listing Location: </h3>
                    <ul>
                      <li
                        className={this.state.editAddress ? 'hidden' : ''}
                        onClick={function(){
                          this.handleClick({editAddress: true})
                        }.bind(this)}
                      >
                        Address: {listing.location.address}
                      </li>
                      <li className={this.state.editAddress ? '' : 'hidden'}>
                        <form onSubmit={this.handleFormSubmit.bind(this)}>
                          <fieldset className="form-group">
                            <label>New Address: </label>
                            <input className="form-control"
                              onChange={function(evt) {
                                this.setState({
                                  inputValue: evt.target.value, type: 'address'
                                });
                              }.bind(this)}/>
                          </fieldset>
                          <button type='button' className="btn btn-danger"
                            onClick={function(){
                              this.handleClick({editAddress: false})
                            }.bind(this)}>
                            hide
                          </button>
                          <button action="submit" className="btn btn-primary">Save</button>
                        </form>
                      </li>
                      {listing.location.usCity !=='not valid' &&
                        <li
                          className={this.state.editusCity ? 'hidden' : ''}
                          onClick={function(){
                            this.handleClick({editusCity: true})
                          }.bind(this)}
                        >
                          City: {listing.location.usCity}
                        </li>}
                        <li className={this.state.editusCity ? '' : 'hidden'}>
                          <form onSubmit={this.handleFormSubmit.bind(this)}>
                            <fieldset className="form-group">
                              <label>New City: </label>
                              <input className="form-control"
                                onChange={function(evt) {
                                  this.setState({
                                    inputValue: evt.target.value, type: 'usCity'
                                  });
                                }.bind(this)}/>
                            </fieldset>
                            <button type='button' className="btn btn-danger"
                              onClick={function(){
                                this.handleClick({editusCity: false})
                              }.bind(this)}>
                              hide
                            </button>
                            <button action="submit" className="btn btn-primary">Save</button>
                          </form>
                        </li>
                      {listing.location.usCity !=='not valid' && <li>State: {listing.location.city}</li>}
                      {listing.location.usCity ==='not valid' && <li>City: {listing.location.city}</li>}
                      <li>Country: {listing.location.country}</li>
                    </ul>
                    <h3>Listing Details: </h3>
                    <ul>
                      <li
                        className={this.state.editPrice ? 'hidden' : ''}
                        onClick={function(){
                          this.handleClick({editPrice: true})
                        }.bind(this)}
                      >
                        Price: ${listing.pricePerNight} / night
                      </li>
                      <li className={this.state.editPrice ? '' : 'hidden'}>
                        <form onSubmit={this.handleFormSubmit.bind(this)}>
                          <fieldset className="form-group">
                            <label>New Price: </label>
                            <input className="form-control" type="number" min="0.01" step="0.01" max="5000.00"
                              onChange={function(evt) {
                                this.setState({
                                  inputValue: evt.target.value, type: 'pricePerNight'
                                });
                              }.bind(this)}/>
                          </fieldset>
                          <button type='button' className="btn btn-danger"
                            onClick={function(){
                              this.handleClick({editPrice: false})
                            }.bind(this)}>
                            hide
                          </button>
                          <button action="submit" className="btn btn-primary">Save</button>
                        </form>
                      </li>
                      <li>Email: {listing.creator.email}</li>
                      <li>Phone Number: {listing.creator.phoneNumber}</li>
                    </ul>
                    <h3>Description: </h3>
                    <ReactMarkdown className='body-spacing' source={listing.description} />
                  </div>
                </div>
              </div>

            </div>
            <br />
          </div>
        </div>
      );
    }
    return (
      <div>Loading...... </div>
    );
  };
}
function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo, listing: state.listing.listing};
}
export default connect(mapStateToProps, actions)(SingleListing);
