import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Table} from 'reactstrap';

class DepositAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: props.activeTab || 0
    }
  }
  render() {
    return (
      <div style={{padding: "22px", justifyContent: "center"}}>
        <Table>
        <thead>
          <tr>
            <th>Accounts</th>
            <th>Current Balance</th>
            <th>Available Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Account - 1</th>
            <td>22</td>
            <td>1000</td>
          </tr>
          <tr>
            <th scope="row">Account - 2</th>
            <td>500</td>
            <td>500</td>
          </tr>
          <tr>
            <th scope="row">Account - 3</th>
            <td>800</td>
            <td>800</td>
          </tr>
        </tbody>
      </Table>
      </div>
    )
  }
}

export default DepositAccount;
