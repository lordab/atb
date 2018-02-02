import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Col, Button, Alert} from 'reactstrap';
import './Login.css'
class Login extends Component {
 constructor() {
   super()
   this.state = {
     id: '',
     passsword: '',
     error: false,
     errorMessage: '',
   }
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
   if (this.state.id < 5) {
     this.setState({
       error: true,
       errorMessage: '*ID needs to be atleast 5 characters long'
     })
   } else if (this.state.id > 20 ) {
     this.setState({
       error: true,
       errorMessage: '*ID cannot be longer than 20 characters'
     })
   }
   // check code here
 }
  render() {
    console.log('in on submit', this.state)
    return (
      <form>
      <div class='container'>
        {this.renderErrors()}
        <div>
          <label style={{fontWeight: 'bold', padding: "10px", fontSize: "20px"}}>ID:</label>
          <input value={this.state.id} onChange={(e) => {this.updateId(e)}} type="text"/>
        </div>
        <div>
          <label style={{fontWeight: 'bold', padding: "10px", fontSize: "20px"}}>Password:</label>
          <input value={this.state.password} onChange={(e) => {this.updatePassword(e)}} type="text"/>
        </div>
        <div>
          <button type="button" class="btn btn-primary btn-lg" onClick={this.onSubmit}>Login</button>
        </div>
      </div>
    </form>
    );
  }
}

export default Login;
