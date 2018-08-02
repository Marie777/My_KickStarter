import React, { Component } from 'react';
import { Field , reduxForm, propTypes, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, ButtonToolbar } from 'react-bootstrap';


class Registration extends Component {

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

  renderSelect(field) {
    const {touched, error} = field.meta;
    const className = `form-group ${touched && error ? 'alert alert-danger' : ''}`;

    return (
      <div className={className}>
        <label>
        {field.label}
        <select value={field.input.value} onChange={field.onChange}>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
      </label>
      </div>
    );
  }


  onSubmit(values) {
    // debugger;
    // console.log("values react:    " + JSON.stringify({...values, createdDate:Date.now()}));
    const data = {
      values: {
        ...values
      }
    };

    axios.post('http://localhost:3001/users/', data)
      .then(res => {
        console.log(res);
      });
}


  render() {
    const {handleSubmit, typeValue, pristine, reset, submitting} = this.props;

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

        <div className = "form-group">
          <label>User type</label>
          <div>
            <Field name="type" component="select">
              <option></option>
              <option value="founder">Founder</option>
              <option value="donator">Donator</option>
            </Field>
          </div>
        </div>
        {typeValue && <div style={{
          height: 80,
          width: 200,
          margin: '10px auto',
          backgroundColor: typeValue
        }}/>}

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
  if(!values.type){
    errors.type = "*Please enter a type";
  }


  return errors;
}



export default reduxForm({
  validate,
  form: 'RegistrationForm'
})(Registration);

const selector = formValueSelector('Registration') // <-- same as form name
Registration = connect(
  state => {
    const typeValue = selector(state, 'type')
    return {
      typeValue
    }
  }
)(Registration)
