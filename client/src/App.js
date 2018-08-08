import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import ProjectNewForm from './components/project_form';
import Registration from './components/registration_form';
import donationForm from './components/donation_form';
import login from './components/login_form';
import ProjectDisplay from './components/project_display';
import ProjectList from './components/project_list';
// import logo from './Kickstarter-logo.png';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:null
        }
    }

    componentWillMount() {
        if(JSON.parse(window.localStorage.getItem('user'))){
            const user = JSON.parse(window.localStorage.getItem('user'));
            this.setState(user);
            console.log("-------- " + user.type);
        }
    }

    renderLoginout(){
        if(!JSON.parse(window.localStorage.getItem('user'))){
            return(
                <NavItem eventKey={3} href="/login">
                    Login
                </NavItem>
            );
        }else{
            return (
                <NavItem eventKey={4} href="/" onClick={() => window.localStorage.removeItem('user')}>
                    Logout
                </NavItem>
            );
        }
    }

    renderCreateProject() {
        if (JSON.parse(window.localStorage.getItem('user'))) {
            const user = JSON.parse(window.localStorage.getItem('user'));
            if (user.type === "donator") {
                    return (null)
                }
            if (user.type === "founder") {
                    return (
                        <NavItem eventKey={1} href="/newproject">
                            Create Project
                        </NavItem>
                    )
                }
            }
        }


        renderRegistration() {
            if (JSON.parse(window.localStorage.getItem('user'))) {
                const user = JSON.parse(window.localStorage.getItem('user'));
                return ( null );
                }else{
                    return (
                        <NavItem eventKey={2} href="/registration">
                           Registration
                        </NavItem>
                    );
            }
        }


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
                {this.renderCreateProject()}
            </Nav>
            <Nav pullRight>
                {this.renderRegistration()}
                {this.renderLoginout()}
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
               path="/donate/:_id"
               component={donationForm}
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
