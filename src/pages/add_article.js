import React, { Component } from "react";
import Header from "../components/login";
import Data from "../components/add_article";

export default class add_article extends Component {
  render() {
    return (
      <div>
        <Header />
        <div
          className='container-fluid mt-5 pb-5 mainhead'
          style={{ width: "80%" }}
        >
          <div className='text-center mb-5'>
            <h2>ADD ARTICLE</h2>
          </div>
          <Data />
        </div>
      </div>
    );
  }
}
