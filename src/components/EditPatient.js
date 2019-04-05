import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import {Redirect} from 'react-router-dom';
import {isDoctor, isPatient, isLoggedIn} from './Helpers.js'

class EditPatient extends Component{
  constructor(props){
    super(props);
    this.state = {  _id:'',  name:'',  email:'', age:'', phone:'' }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount(){
    const token =   window.localStorage.token
    const decoded = jwt_decode(token)
    console.log(decoded)
    this.setState({
        _id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        phone: decoded.phone,
        age: decoded.age
    })
    // this.getPatient();
  }


  getPatient(){
    let pID = this.props.match.params.id;
    console.log(pID)
    axios.get(`http://localhost:5000/api/findPatient/`, {
      params: {  id: pID }
    }).then(response => {
        this.setState({details: response.data}, () => {
          console.log(this.state);

        })

  }).catch(err => console.log(err));
  }

  editProfile(newMeetup){
    let pID = this.state._id
    console.log(this.state)
    axios.post(`http://localhost:5000/api/updateUser/`, {
      params: {  id: pID, data: newMeetup }
    }).then(response => {
      if(response.status!==200) {
          alert('Error updating in please try again');
      }

      console.log(response.data)


      this.setState({details: response.data}, () => {
        axios.get(`http://localhost:5000/api/findPatient/`, {
          params: {  id: pID }
        }).then(data => {
          console.log(data.data)
          this.setState({details: data.data}, () => {
              axios.post(`http://localhost:5000/api/setToken`,
              data.data
            ).then(token => {
              console.log(token.data)
              if(response.status===200) {
                window.localStorage.setItem('token', token.data);
                this.props.history.push('/profile');
              }

            }).catch(err => {
              console.error(err);
              alert('Error updating in please try again');
            })
        })
      }).catch(err => console.log(err));
      })


  }).catch(err => {console.log(err)
    console.error(err);
    alert('Error updating in please try again');
  }

  );

  }

  onSubmit(e){
    e.preventDefault();
    let pID = this.props.match.params.id;
    const newMeetup = {
      _id: pID,
      name: this.state['name'],
      email: this.state['email'],
      age: parseInt(this.state['age']),
      phone: parseInt(this.state['phone'])
    }
    this.editProfile(newMeetup);
  }

  handleInputChange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }



  render(){



    return (
      <div className="container">
            <div className="jumbotron mt-5">

                <div className="col-sm-8 mx-auto">

                    <Link className="btn grey" to="/profile">Back</Link>
                    <h1 className="text-center">Edit Profile</h1>
                </div>
                <br />



               <form id="EditPatient" onSubmit={this.onSubmit.bind(this)}>

               <div className="col-sm-4 mx-auto">
                  <div className="input-field">
                    <input type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange} />
                    <label htmlFor="name">Name</label>
                  </div>
              </div>

              <div className="col-sm-4 mx-auto">

                  <div className="input-field">
                    <input type="text" name="email" ref="email" value={this.state.email} onChange={this.handleInputChange} />
                    <label htmlFor="email">Email</label>
                  </div>
                  </div>

                  <div className="col-sm-4 mx-auto">

                  <div className="input-field">
                    <input type="text" name="age" ref="age" value={this.state.age} onChange={this.handleInputChange} />
                    <label htmlFor="age">Age</label>
                  </div>
                  </div>

                  <div className="col-sm-4 mx-auto">
                  <div className="input-field">
                    <input type="text" name="phone" ref="phone" value={this.state.phone} onChange={this.handleInputChange} />
                    <label htmlFor="phone">phone</label>
                  </div>
                  </div>


                  <div className="col-sm-4 mx-auto">

                  <input type="submit" value="Submit" />
                  </div>


                </form>




            </div>

        </div>


    )
  }
}

export default EditPatient;
