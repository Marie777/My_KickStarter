import React, { Component } from 'react';
import axios from 'axios';
import { Label } from 'react-bootstrap';

class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pList : []
    }
  }

  componentDidMount() {
    const URL = 'http://localhost:3001/project/';
    // debugger;
    axios.get(URL)
      .then(res => {
        console.log(res.data);
        this.setState({pList : res.data})
      });
  }

  render() {
    return (
      <div>
        <h3>
          Total live projects: <Label>New</Label>
          Total live projects not yet founded: <Label>New</Label>
        </h3>

      </div>
    );
  }
}

export default Homepage;
