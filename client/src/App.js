import React, { Component } from 'react';
import './App.css';
import ProjectNewForm from './components/project_form';

class App extends Component {
  render() {
    return (
        <div>
          <header className="App-header">
            <h1 className="App-title">My-KickStarter</h1>
          </header>
          <div>
            <ProjectNewForm/>
          </div>
        </div>
    );
  }
}

export default App;
