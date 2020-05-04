import React, { Component } from 'react';
import Header from '../components/login';
import Data from '../components/reservation_form';

export default class add_consult extends Component {
  render() {
    return (
      <div>
        <Header />
        <div
          className='container-fluid margin-top pb-5 mainhead'
          style={{ width: '80%' }}
        >
          <div className='text-center mb-5'>
            <h2>FORM CONSULTATION</h2>
          </div>
          <Data />
        </div>
      </div>
    );
  }
}
