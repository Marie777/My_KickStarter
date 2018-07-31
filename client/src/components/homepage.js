import React, { Component } from 'react';
import { Label } from 'react-bootstrap';
import ProjectList from './projectList';

class Homepage extends Component {

  render() {
    return (
      <div>
        <h3>
          Total live projects: <Label>New</Label>
          Total live projects not yet founded: <Label>New</Label>
        </h3>
        <div>
          <ProjectList/>
        </div>
      </div>
    );
  }
}

export default Homepage;
