import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import ProjectNewForm from './components/project_form';
import Registration from './components/registration_form';
import login from './components/login_form';
import ProjectDisplay from './components/project_display';
import ProjectList from './components/project_list';
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
              <NavItem eventKey={1} href="/newproject">
                Create Project
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={2} href="/registration">
                Registration
              </NavItem>
              <NavItem eventKey={3} href="/login">
                Login
              </NavItem>
            </Nav>
          </Navbar>
          <Switch>
             <Route
               path="/newproject"
               component={ProjectNewForm}
             />
             <Route
               path="/editproject/:_id"
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
               path="/login"
               component={login}
             />
             <Route
               path="/"
               component={ProjectList}
             />
           </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

// <img className="App-logo" src={logo}/>
