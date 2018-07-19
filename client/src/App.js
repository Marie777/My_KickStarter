import React, { Component } from 'react';
import './App.css';
import ProjectNew from './components/project_form';
import ProjectDropZone from './components/project_dropZone';


class App extends Component {
  render() {
    return (
        <div>
          <header className="App-header">
            <h1 className="App-title">My-KickStarter</h1>
          </header>
          <div>
            <ProjectNew/>
          </div>
          <div>
            <ProjectDropZone/>
          </div>
        </div>
    );
  }
}

export default App;
