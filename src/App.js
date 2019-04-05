import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import Profile from './components/Profile'
import Patients from './components/Patients'
import EditPatient from './components/EditPatient'
import PatientDetails from './components/PatientDetails'
import Error from './components/Error'

import {isDoctor, isPatient, isLoggedIn} from './components/Helpers.js'

class App extends Component {

  render () {

    return (


      <Router>
        <div className="App">
          <NavBar />
          <div className="container">



          <Route exact path="/error" component={Error} />
          <Route exact path="/" component={Home} />

          <Route exact path="/login" render={(props) => (isLoggedIn() ? (  <Redirect to="/"/>  ) : (  <Login{...props}/>)  )}/>

          <Route exact path="/profile" render={(props) => (!isPatient() ? (  <Redirect to="/error"/>  ) : (  <Profile{...props}/>)  )}/>
          <Route exact path='/patients/edit/:id' render={(props) => (!isPatient() ? (  <Redirect to="/error"/>  ) : (  <EditPatient{...props}/>)  )}/>

          <Route exact path="/patients" render={(props) => (!isDoctor() ? (  <Redirect to="/error"/>  ) : (  <Patients{...props}/>)  )}/>
          <Route exact path="/patients/:id" render={(props) => (!isDoctor() ? (  <Redirect to="/error"/>  ) : (  <PatientDetails{...props}/>)  )}/>



          </div>

        </div>
      </Router>
    );
  }
}

export default App;
