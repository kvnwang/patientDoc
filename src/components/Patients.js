import React, { Component } from 'react';
import axios from 'axios';
import Patient from './Patient';
import jwt_decode from 'jwt-decode'
import {Redirect} from 'react-router-dom';

class Patients extends Component{
  constructor(){
    super();
    this.state = {
      patients: [],
      search: "",
      loggedRole: ""
    }
  }

  updateSearch(e) {
    this.setState({search: e.target.value})
  }

  componentWillMount(){
    const decoded = jwt_decode(window.localStorage.token)
    this.setState({
        loggedRole: parseInt(decoded.role)
    })

    axios.get('http://localhost:5000/api/getPatients')
      .then(response => {
        this.setState({patients: response.data}, () => {
          // console.log(response.data)
        })
    })
    .catch(err => console.log(err));
  }

  render(){
    if(this.state.loggedRole===0) {
      return (<div><Redirect to="/" /> </div>)
    }

    let filteredPatients=this.state.patients.filter(
      (contact) =>{
        let v1=contact.name.toLowerCase()
        let v2=this.state.search.toLowerCase()
        if(v1.includes(v2)) return true;
        return false;
      }
    );


    return (
      <div className="container">
          <div className="row">
              <div className="col-md-6 mt-5 mx-auto">

                      <input type="text" placeholder="Search" className="input" id="addInput"  onChange={this.updateSearch.bind(this)}  />
                      <br></br>
                      <br></br>
                      <br></br>

                      <div class="mx-auto" >
                            <h1>Patients</h1>
                      </div>

                      <div class="mx-auto" >

                      <ul className="collection">

                      {filteredPatients.map((patient, i) => {
                        return(
                          <Patient key={patient._id} item={patient} />
                        )
                      })} </ul>
                      </div>

              </div>
          </div>
      </div>




    )
  }
}
export default Patients
