import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DepositAccount from '../components/DepositAccount'
class AccountsSummary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: props.activeTab || 0
    }
  }
  render() {
    return (
      <div className="container-fluid" style={{padding: "22px", justifyContent: "center"}}>

        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li eventKey={0} class="nav-item">
            <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Deposit</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Loan</a>
          </li>
        </ul>
<div class="tab-content" id="pills-tabContent">
  <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
    <DepositAccount />
  </div>
  <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">Loan</div>
</div>
      </div>
    )
  }
}

export default AccountsSummary;
