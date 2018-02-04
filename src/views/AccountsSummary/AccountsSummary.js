import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';
import DepositAccount from '../components/DepositAccount'
import LoanAccount from '../components/LoanAccount'
import { TabContent, TabPane, Nav, NavItem, Navbar, NavLink, NavbarBrand, Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';

class AccountsSummary extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.loadDataFromServer = this.loadDataFromServer.bind(this)
    this.getAccounts = this.getAccounts.bind(this)
    this.state = {
      activeTab: 1,
      accounts: null,
      depositAccount: [],
      loanAccount: [],
    }
  }
  componentWillMount (props) {
    this.loadDataFromServer()
  }

  getAccounts() {
    if(this.state.accounts) {
      _.forEach(this.state.accounts, (account) => {
        if(account.accountType === 'Deposit') {
          this.state.depositAccount.push(account)
        } else if(account.accountType === 'Loan') {
          this.state.loanAccount.push(account)
        }
      })
    }
  }

  loadDataFromServer() {
    axios.get(this.props.accountsUrl)
    .then(res => {
      this.setState({accounts: res.data}, () => this.getAccounts())
    })
  }

  toggle(tab) {
   if (this.state.activeTab !== tab) {
     this.setState({
       activeTab: tab
     });
   }
 }

  render() {
    console.log('accountssummary', this.props)
    return (
      <div className="App">
        <div className='topnav'>
          <h2>ATB APP</h2>
        </div>
        <div style={{padding: '100px'}}>
        <Container fluid>
        <Nav tabs justified fill>
           <NavItem>
             <NavLink
               className={classnames({ active: this.state.activeTab === '1' })}
               onClick={() => { this.toggle('1'); }}
             >
               Deposit Accounts
             </NavLink>
           </NavItem>
           <NavItem>
             <NavLink
               className={classnames({ active: this.state.activeTab === '2' })}
               onClick={() => { this.toggle('2')}}
             >
               Loan Accounts
             </NavLink>
           </NavItem>
         </Nav>
         <TabContent activeTab={this.state.activeTab}>
           <TabPane tabId="1">
             <Row>
               <DepositAccount accounts={this.state.depositAccount}/>
             </Row>
           </TabPane>
           <TabPane tabId="2">
             <Row>
               <LoanAccount accounts={this.state.loanAccount}/>
             </Row>
           </TabPane>
         </TabContent>
       </Container>
      </div>
      </div>
    )
  }
}
AccountsSummary.propTypes = {
  accountsUrl: PropTypes.string,
  userId: PropTypes.string,
}
 AccountsSummary.defaultProps = {
   accountsUrl: 'http://localhost:5000/api/accounts'
 }

export default AccountsSummary;
