import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Homepage from './components/homepage';
import ProjectNewForm from './components/project_form';
import Registration from './components/registration';
import GenericList from './components/genericList';
import ProjectDisplay from './components/project_display';
// import logo from './Kickstarter-logo.png';


class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <div>

          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Crowd Funding</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem eventKey={1} href="projectList">
                Project List
              </NavItem>
              <NavItem eventKey={2} href="newproject">
                Create Project
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={2} href="registration">
                Registration
              </NavItem>
              <NavItem eventKey={3} href="#">
                Login/Logout
              </NavItem>
            </Nav>
          </Navbar>
          <Switch>

             <Route
               path="/projectList"
               render={(props) => <GenericList {...props} listName="project" />}
             />
             <Route
               path="/newproject"
               component={ProjectNewForm}
             />
             <Route
               path="/ProjectDisplay/:_id"
               component={ProjectDisplay}
             />
             <Route
               path="/registration"
               component={Registration}
             />
             <Route
               path="/"
               component={Homepage}
             />
           </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

// <img className="App-logo" src={logo}/>
