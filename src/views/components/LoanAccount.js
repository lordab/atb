import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'
import {Table} from 'reactstrap';

class LoanAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: props.activeTab || 0
    }
  }
  render() {
    let accounts = []
    let count = 0
    _.forEach(this.props.accounts, (acc) => {
      console.log('in render function', acc)
      count++
      accounts.push(
        <tr key={_.uniqueId()}>
        <th scope="row">{'account-'+ count}</th>
        <td>{acc.availableBalance}</td>
        <td>{acc.currentBalance}</td>
      </tr>)
    })
    if(_.isEmpty(this.props.accounts)) {
      return (
        <div style={{margin: "50px"}}>
          <span>No accounts to display</span>
        </div>
      )
    } else {
      return (
        <div style={{marginLeft: "200px", marginTop: "60px", justifyContent: "center"}}>
          <Table bordered>
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
              <th>Total Current Balance</th>
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
