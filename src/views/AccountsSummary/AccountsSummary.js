import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DepositAccount from '../components/DepositAccount'
import LoanAccount from '../components/LoanAccount'
import { TabContent, TabPane, Nav, NavItem, NavLink, CarButton, Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';
class AccountsSummary extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      activeTab: 1
    }
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
      <div>
        <Container fluid>
        <Nav tabs>
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
               onClick={() => { this.toggle('2'); }}
             >
               Loan Accounts
             </NavLink>
           </NavItem>
         </Nav>
         <TabContent activeTab={this.state.activeTab}>
           <TabPane tabId="1">
             <Row>
               <DepositAccount />
             </Row>
           </TabPane>
           <TabPane tabId="2">
             <Row>
               <LoanAccount />
             </Row>
           </TabPane>
         </TabContent>
       </Container>
      </div>
    )
  }
}

export default AccountsSummary;
