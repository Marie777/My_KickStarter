import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import './App.css';
import ProjectNewForm from './components/project_form';
import Registration from './components/registration';
import GenericList from './components/genericList';
import logo from './Kickstarter-logo.png';
import { Navbar, Nav, MenuItem, NavItem, NavDropdown } from 'react-bootstrap';

class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <div>

          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="projectList">Crowd Funding</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem eventKey={1} href="newproject">
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
      </BrowserRouter>
    );
  }
}

// class App extends Component {
//   render() {
//     return (
//       <BrowserRouter>
//           <div>
//             <header className="App-header">
//               <img className="App-logo" src={logo}/>
//               <h1 className="App-title">Crowd Funding </h1>
//             </header>
//             <div>
//               <Route
//                 path="/projectList"
//                 render={(props) => <GenericList {...props} listName="project" />}
//               />
//               <Route
//                 path="/newproject"
//                 component={ProjectNewForm}
//               />
//               <Route
//                 path="/registration"
//                 component={Registration}
//               />
//             </div>
//           </div>
//         </BrowserRouter>
//     );
//   }
// }

export default App;

// <img className="App-logo" src={logo}/>
