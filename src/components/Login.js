// Login.jsx
import React, { Component } from 'react';
import axios from 'axios';
import {isDoctor, isPatient} from './Helpers.js'

export default class Login extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    this.state = {
      email : '',
      password: ''
    };
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:5000/api/authenticate`,
      this.state
    ).then(response => {
      if(response.status===200) {
        localStorage.setItem('token', response.data);
        isPatient() ? this.props.history.push(`/profile`) : this.props.history.push(`/patients`)
      }

    }).catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    })
  };


  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login Below!</h1>
        <input
          type="text"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleInputChange}

        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
       <input type="submit" value="Submit"/>
      </form>
    );
  }
}
