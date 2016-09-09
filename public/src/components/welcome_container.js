import React from 'react';
import BasicInfo from './info/basic';
//WELCOMING PAGE
export default () => (
  <div>
    <div id="headerImage">

    </div>
    <div className='center-div'>
      <div className="transbox">
        <h1>Find your Home Away from Home</h1>
      </div>
    </div>

    <div className="container background-down">
      <div className="row">
        <BasicInfo />
      </div>
    </div>
  </div>
)
