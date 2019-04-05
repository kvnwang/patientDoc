import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import  { Redirect , Link} from 'react-router-dom'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            name: '',
            email: '',
            phone: '',
            age:'',
            role: ''

        }
    }

    componentDidMount () {
        const token =   window.localStorage.token
        const decoded = jwt_decode(token)
        this.setState({
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            phone: decoded.phone,
            age: decoded.age,
            role: parseInt(decoded.role)
        })
      }


    render () {

      return (
          <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Profile Info: </h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{this.state.name}</td>
                            </tr>

                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>{this.state.phone}</td>
                            </tr>

                            <tr>
                                <td>Age</td>
                                <td>{this.state.age}</td>
                            </tr>

                        </tbody>

                    </table>

                    <div className="col-sm-4 mx-auto">
                        <Link className="btn" to={`/patients/edit/${this.state.id}`}> Edit</Link>
                    </div>

                </div>

            </div>
        )
    }
}

export default Profile
