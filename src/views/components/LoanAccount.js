import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'
import {Table} from 'reactstrap';

class LoanAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: props.activeTab || 0,
      totalCurrentBalance: 0,
      totalAvailableBalance: 0,
    }
  }
  render() {
    let accounts = []
    let count = 0
    let total = 0
    let totalAvailable = 0
    _.forEach(this.props.accounts, (acc) => {
      count++
      total = total + acc.currentBalance
      totalAvailable = totalAvailable + acc.availableBalance
      accounts.push(
        <tr key={_.uniqueId()}>
        <th scope="row">{'Loan Account '+ count}</th>
        <td>{acc.currentBalance}</td>
        <td>{acc.availableBalance}</td>
      </tr>)
    })
    this.state.totalCurrentBalance = total
    this.state.totalAvailableBalance = totalAvailable
    if(_.isEmpty(this.props.accounts)) {
      return (
        <div style={{margin: "50px"}}>
          <span>No loan accounts to display</span>
        </div>
      )
    } else {
      return (
        <div style={{marginLeft: "200px", marginTop: "60px", justifyContent: "center"}}>
          <Table dark>
          <thead>
            <tr>
              <th>Accounts</th>
              <th>Current Balance</th>
              <th>Available Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts}
            <tr>
              <th>Total</th>
              <th>{this.state.totalCurrentBalance }</th>
              <th>{this.state.totalAvailableBalance}</th>
            </tr>
          </tbody>
        </Table>
        </div>
      )
    }
  }
}

LoanAccount.propTypes = {
  accounts: PropTypes.array,
}

export default LoanAccount;
