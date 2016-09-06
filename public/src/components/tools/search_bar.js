import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props); //calls the parent method from Component (a lower level class)
    this.state = { term: '' };
  }
  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term)
  }
  render() {
    return (
      <div className='row'>
        <div className='col-sm-8'>
          <input placeholder='Enter Your Search Terms' className="form-control" id='searchBar'
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value)}/>
        </div>
      </div>
    )
  }
}
export default SearchBar;
