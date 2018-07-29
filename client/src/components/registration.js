import React, { Component } from 'react';
import { Field , reduxForm, propTypes } from 'redux-form';
import axios from 'axios';
import {
  // FormGroup,
  // FormControl,
  // ControlLabel,
  // Button,
  // Panel,
  Grid,
  Row,
  // Col,
} from 'react-bootstrap';

class Registration extends Component {

  renderField(field) {
    const {touched, error} = field.meta;
    const className = `form-group ${touched && error ? 'alert alert-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
        className="form-control "
          type = "text"
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
    // console.log("values react:    " + JSON.stringify({...values, createdDate:Date.now()}));
    // let projectID = this.props.projectID !== "" ? this.props.projectID : "";
    //
    // const data = {
    //   values: {
    //     ...values,
    //     expirationDate: new Date(values.expirationDate),
    //     createdDate:Date.now(),
    //     projectID
    //   }
    // };
    //
    // axios.post('http://localhost:3001/project/', data)
    //   .then(res => {
    //     console.log(res);
    //     if(values.images){
    //       values.images.forEach((img) => {
    //         const fd = new FormData();
    //         fd.append('file',img);
    //         fd.append('projectId', res.data._id);                       //TODO: projectId isn't correct
    //         axios.post('http://localhost:3001/project/upload', fd)
    //           .then(res => {console.log(res)});
    //       });
    //     }
    //   });

}


  render() {
    const {handleSubmit} = this.props;

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
        <Field
          label = "Type"
          name = "type"
          component = {this.renderField}
        />
        <button type="submit" className="btn btn-primary">submit</button>
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
