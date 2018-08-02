import React, { Component } from 'react';
import { Field , reduxForm} from 'redux-form';
// import { connect } from 'react-redux';
// import axios from 'axios';
import { Button, ButtonToolbar } from 'react-bootstrap';

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
    //TODO:
    // axios.post('http://localhost:3001/users/', data)
    //   .then(res => {
    //     console.log(res);
    //   });

}


  render() {
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



export default reduxForm({
  validate,
  form: 'loginForm'
})(LoginForm);
