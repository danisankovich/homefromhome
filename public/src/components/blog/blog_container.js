import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import BlogList from './blog_list';

//WELCOMING PAGE
class Blog_Container extends Component {
  componentWillMount() {
    this.props.fetchInfo();
  }
  render() {
    let {userInfo} = this.props;
      return (
        <div className='container toppush'>
          <div className="row">
            <div className="col-sm-12">
              <h1 className='text-center'>Blog Info</h1>
            </div>
            <BlogList />
          </div>
          <br />
        </div>
      );
  };
}
function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo};
}
export default connect(mapStateToProps, actions)(Blog_Container);
