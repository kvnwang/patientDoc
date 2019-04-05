import React, {Component} from "react";
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Login from './components/Login'

class ProtectedRoute extends Component {
    render() {

      const { component: Component, ...props } = this.props

      return (

        <Route
          {...props}
          render={props => (
              (  <Login{...props}/>)
              (  <Redirect to="/login"/>  )
          )}
        />
      )
    }
  }
export default ProtectedRoute;
