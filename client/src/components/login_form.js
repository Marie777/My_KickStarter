import React, { Component } from 'react';
import { Field , reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, ButtonToolbar } from 'react-bootstrap';
// import { fetchUser } from '../actions';
// import {fetchProjects} from "../actions";

class LoginForm extends Component {

  renderField(field) {
    const {touched, error} = field.meta;
    const className = `form-group ${touched && error ? 'alert alert-danger' : ''}`;
    const type = field.label === "Password" ? "password" : "text";

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control "
          type = {type}
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }



  onSubmit(values) {
    // debugger;
    const data = {
      values: {
        ...values
      }
    };
    const URL = `http://localhost:3001/users/login`;
    axios.post(URL, data).then((res) => {
        const {user} = res.data;
        console.log(user);
        window.localStorage.setItem('user', JSON.stringify(user));
            this.props.history.push({
            pathname: '/',
                state: { user }
        });
    });

    // this.props.fetchUser(data);
  }


    render() {
        // const {user} = this.props;

        const {handleSubmit, pristine, reset, submitting} = this.props;

        return (
          <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label = "Username"
              name = "username"
              component = {this.renderField}
            />
            <Field
              label = "Password"
              name = "password"
              component = {this.renderField}
            />
            <ButtonToolbar>
              <Button type="submit" className="btn btn-primary" disabled={submitting}>submit</Button>
              <Button type="button" className="btn btn-primary" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
            </ButtonToolbar>
          </form>
        );
      }


    }

function validate(values){
  // console.log("values:    " + JSON.stringify(values));
  const errors = {};
  if(!values.username){
    errors.username = "*Please enter a username";
  }
  if(!values.password){
    errors.password = "*Please enter a password";
  }
  return errors;
}


LoginForm = reduxForm({
  validate,
  form: 'LoginForm'
})(LoginForm)

LoginForm = connect(
  ({user}) => ({
      user
  })
  // ,{ fetchUser }
)(LoginForm)

export default LoginForm

// export default reduxForm({
//   validate,
//   form: 'loginForm'
// })(LoginForm);

// function mapStateToProps(state) {
//     return {
//         projects: state.projects
//     };
// }
//
// export default connect(mapStateToProps, {fetchProjects})(LoginForm);
