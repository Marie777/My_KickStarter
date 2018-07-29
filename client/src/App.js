import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import './App.css';
import ProjectNewForm from './components/project_form';
import Registration from './components/registration';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div>
            <header className="App-header">
              <h1 className="App-title">My-KickStarter</h1>
            </header>
            <div>
              <Route path="/newproject" component={ProjectNewForm} />
              <Route path="/registration" component={Registration} />
            </div>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
