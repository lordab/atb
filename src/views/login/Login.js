import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import './Login.css'

class Login extends Component {
 constructor(props) {
   super(props)
   this.state = {
     users: {},
     id: '',
     passsword: null,
     error: false,
     errorMessage: null,
   }
   this.loadDataFromServer = this.loadDataFromServer.bind(this)
   this.onSubmit = this.onSubmit.bind(this)
   this.renderErrors = this.renderErrors.bind(this)
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
 onSubmit() {
   console.log('length', this.state.id.length)
   if (this.state.id.length < 5) {
     this.setState({
       error: true,
       errorMessage: '*ID needs to be atleast 5 characters long'
     })
   }
   if (this.state.id.length > 20) {
     this.setState({
       error: true,
       errorMessage: '*ID cannot be longer than 20 characters'
     })
   }
   if(_.isEmpty(this.state.password)) {
     this.setState({
       error: true,
       errorMessage: '*ID cannot be longer than 20 characters'
     })
   }
 }
  render() {
    console.log('in on submit', this.state, 'Props', this.props, axios.get(this.props.url))
    return (
      <form>
      <div className='container'>
        {this.renderErrors()}
        <div>
          <label style={{fontWeight: 'bold', padding: "10px", fontSize: "20px"}}>
            <span>ID:</span>
            </label>
          <input value={this.state.id} onChange={(e) => {this.updateId(e)}} type="text"/>
        </div>
        <div>
          <label style={{fontWeight: 'bold', padding: "10px", fontSize: "20px"}}>Password:</label>
          <input value={this.state.password} onChange={(e) => {this.updatePassword(e)}} type="text"/>
        </div>
        <div>
          <button type="button" className="btn btn-primary btn-lg" >Login</button>
        </div>
      </div>
    </form>
    );
  }
}

Login.propTypes = {
  url: PropTypes.string,
  users: PropTypes.object,
}

export default Login;
