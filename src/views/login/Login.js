import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './Login.css'

class Login extends Component {
 constructor(props) {
   super(props)
   this.state = {
     users: {},
     id: '',
     passsword: '',
     error: false,
     errorMessage: '',
     validated: false,
   }

   this.updatePassword = ({ target }) => {
      this.setState({
        password: target.value,
      })
    }
    this.updateId = ({ target }) => {
      this.setState({
        id: target.value,
      })
    }

   this.loadDataFromServer = this.loadDataFromServer.bind(this)
   this.onSubmit = this.onSubmit.bind(this)
   this.renderErrors = this.renderErrors.bind(this)
   this.routeToPage = this.routeToPage.bind(this)
   this.validateForm = this.validateForm.bind(this)

 }

 loadDataFromServer() {
   axios.get(this.props.url)
   .then(res => {
     this.setState({users: res.data})
   })
 }

 componentWillMount(){
   this.loadDataFromServer()
 }

 renderErrors() {
  if (this.state.error) {
    return (
      <div>
        <Alert color="danger" >
          {this.state.errorMessage}
        </Alert>
      </div>
    )
  }
}

validateForm () {
  let regExp = /(?=.*[%#*&!@])(?=.*[a-z])(?=.*[A-Z]).{10,}/
  let regExpLetters = /([a-zA-Z]){4}/

  // Validation for userId
  if(_.isEmpty(this.state.id)) {
    this.setState({
      error: true,
      errorMessage: '*ID cannot be blank'
    })
  } else if (this.state.id.length <= 7) {
    this.setState({
      error: true,
      errorMessage: '*ID needs to be atleast 8 characters long'
    })
  } else if (this.state.id.length > 8 && this.state.id.length > 20 ) {
    this.setState({
      error: true,
      errorMessage: '*ID cannot be longer than 20 characters'
    })
  }

  // Validation for Password
  else if(_.isEmpty(this.state.password)) {
    this.setState({
      error: true,
      errorMessage: '*Password cannot be empty'
    })
  } else if(this.state.password.length < 10 || this.state.password.length > 20) {
    this.setState({
      error: true,
      errorMessage: '*Password must be 10-20 characters long '
    })
  } else if (!regExp.test(this.state.password)){
    this.setState({
      error: true,
      errorMessage: "*Password must contain One of these %#*&!@ characters, One Capital letter, One lower case letter"
    })
  } else if (regExpLetters.test(this.state.password)){
    this.setState({
      error: true,
      errorMessage: "*Password cannot have more than 3 letters together"
    })
  } else {
    this.setState({
      error: false,
      errorMessage: '',
      validated: true
    })
  }
}

 onSubmit() {
   this.validateForm()
 }

 routeToPage() {
  if(this.state.validated) {
    return(
        <a>
          <Link to={{ pathname: 'accountsSummary', state: { id: this.state.id} }}>Go To accounts</Link>
        </a>
    )
  }
 }

  render() {
    console.log('Validated', this.state.validated)
    return (
      <div className='Login'>
      <form>
        {this.renderErrors()}
        <div>
          <input placeholder="Enter User Id" value={this.state.id} onChange={(e) => {this.updateId(e)}} type="text"/>
        </div>
        <div>
          <input placeholder="Password" value={this.state.password} onChange={(e) => {this.updatePassword(e)}} type="password" />
        </div>
        <div>
          <button type="button" disabled={this.state.validated} className="btn btn-primary btn-lg" onClick={this.onSubmit}>Login</button>
        </div>
        {(!this.state.error && !_.isEmpty(this.state.id)) ? this.routeToPage(): null}
    </form>
  </div>
    );
  }
}

Login.propTypes = {
  url: PropTypes.string,
  users: PropTypes.object,
}

export default Login;
