import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Table} from 'reactstrap';
import _ from 'lodash'

class DepositAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: props.activeTab || 0
    }
  }
  render() {
    console.log('in deposit account component', this.props.accounts)
    let accounts = []
    _.forEach(this.props.accounts, (acc) => {
      console.log('in render function', acc)
      accounts.push(
        <tr key={_.uniqueId()}>
        <th scope="row">account</th>
        <td>{acc.availableBalance}</td>
        <td>{acc.currentBalance}</td>
      </tr>)
    })
    return (
      <div style={{padding: "22px", justifyContent: "center"}}>
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
        </tbody>
      </Table>
      </div>
    )
  }
}
DepositAccount.propTypes = {
  accounts: PropTypes.array,
}
export default DepositAccount;
