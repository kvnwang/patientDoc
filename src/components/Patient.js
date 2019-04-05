import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Patient extends Component{
  constructor(args){
    super(args);

    this.state = {
      item:args.item
    }
  }


  render(){

    return (
      <div>
        <br />
        <h3>{this.state.item.name}</h3>
        <h5> <Link to={`/patients/${this.state.item._id}`}>Get Info</Link></h5>


       </div>
    )
  }
}

export default Patient;
