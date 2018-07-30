import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import './App.css';
import ProjectNewForm from './components/project_form';
import Registration from './components/registration';
import GenericList from './components/genericList';
import logo from './Kickstarter-logo.png';

// <h1 className="App-title">
// </h1>

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div>
            <header className="App-header">
              <h1>Crowd Funding </h1>
              <div>
              <img className="App-logo" src={logo}/>
              </div>

            </header>
            <div>
              <Route
                path="/projectList"
                render={(props) => <GenericList {...props} listName="project" />}
              />
              <Route path="/newproject" component={ProjectNewForm} />
              <Route path="/registration" component={Registration} />
            </div>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
