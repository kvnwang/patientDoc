import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

class Navbar extends Component {

    logOut (e) {
        e.preventDefault()
        window.localStorage.removeItem('token')
        this.props.history.push(`/`)
    }

    isLoggedIn() {
      const token =   localStorage.getItem('token');
      if(token==null) return false;
      const exp = parseInt(jwt_decode(token).exp)

      if (exp < new Date().getTime()/1000) {
          localStorage.removeItem('token')
          return false;
      } else {
        return true;
      }

    }

    isPatient() {
      const token =   window.localStorage.token
      const decoded = jwt_decode(token)
      return (decoded.role===0)
    }

    isDoctor() {
      const token =   window.localStorage.token
      const decoded = jwt_decode(token)
      return (decoded.role===1)
    }

    render () {
        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
        )

        const patientLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        User
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="nav-link" onClick={this.logOut.bind(this)} className="nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        )

        const doctorLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/patients" className="nav-link">
                        Patients
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="nav-link" onClick={this.logOut.bind(this)} className="nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        )

        let linkData;
        if(!this.isLoggedIn()) {
          console.log("loggedIn")

            linkData=loginRegLink;
        } else if(this.isDoctor()) {
            linkData=doctorLink;
        } else {
          console.log("patient")

            linkData=patientLink
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar1"
                    aria-controls="navbar1"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-md-center" id="navbar1">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                    </ul>
                    {}
                    {linkData}
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)
