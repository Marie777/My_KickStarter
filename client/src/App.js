import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import './App.css';
import ProjectNewForm from './components/project_form';
import Registration from './components/registration';
import GenericList from './components/genericList';
import logo from './Kickstarter-logo.png';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div>
            <header className="App-header">
              <img className="App-logo" src={logo}/>
              <h1 className="App-title">Crowd Funding </h1>
            </header>
            <div>
              <Route
                path="/projectList"
                render={(props) => <GenericList {...props} listName="project" />}
              />
              <Route
                path="/newproject"
                component={ProjectNewForm}
              />
              <Route
                path="/registration"
                component={Registration}
              />
            </div>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
