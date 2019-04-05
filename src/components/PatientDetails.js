import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import {Redirect} from 'react-router-dom';

class PatientDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      details:'',
      loggedRole: ''
    }
  }

  componentWillMount(){
    const decoded = jwt_decode(window.localStorage.token)
    this.setState({
        loggedRole: parseInt(decoded.role)
    })

    this.getPatient();
  }

  getPatient(){
    let pID = this.props.match.params.id;
    axios.get(`http://localhost:5000/api/findPatient/`, {
      params: {  id: pID }
    }).then(response => {
      this.setState({details: response.data}, () => {
        // console.log(this.state);
      })
  })
  .catch(err => console.log(err));
  }



  render(){
    
    return (
     <div>
       <br />
       <Link className="btn grey" to="/patients">Back</Link>
       <h1>{this.state.details.name}</h1>
       <ul className="collection">
        <li className="collection-item">Name: {this.state.details.name}</li>
        <li className="collection-item">Age: {this.state.details.age}</li>
        <li className="collection-item">Email: {this.state.details.email}</li>
        <li className="collection-item">Number: {this.state.details.phone}</li>
        </ul>

      </div>
    )
  }
}

export default PatientDetails;
