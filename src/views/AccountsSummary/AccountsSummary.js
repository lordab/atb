import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';
import DepositAccount from '../components/DepositAccount'
import LoanAccount from '../components/LoanAccount'
import { TabContent, TabPane, Nav, NavItem, NavLink, Container, Row } from 'reactstrap';
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
    let url = this.props.accountsUrl + '/' + this.props.location.state.id
    axios.get(url)
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
    return (
      <div className="App">
        <div className='topnav'>
          <div style={{height: "50px", fontWeight: "bold", fontSize: "30px"}}>ATB APP</div>
        </div>
        <div style={{margin: "50px"}}>
          <span>Welcome to Accounts Summary</span>
        </div>
        <div style={{padding: '100px'}}>
        <Container fluid>
        <Nav pills justified fill>
          <button>
           <NavItem>
             <NavLink
               className={classnames({ active: this.state.activeTab === '1' })}
               onClick={() => { this.toggle('1'); }}
             >
               Deposit Accounts
             </NavLink>
           </NavItem>
         </button>
         <button>
           <NavItem>
             <NavLink
               className={classnames({ active: this.state.activeTab === '2' })}
               onClick={() => { this.toggle('2')}}
             >
               Loan Accounts
             </NavLink>
           </NavItem>
         </button>
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
