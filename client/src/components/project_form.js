import React, { Component } from 'react';
import { Field , reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class ProjectNew extends Component {

  renderField(field) {
    const {touched, error} = field.meta;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

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


  renderUploadField(field) {
    return (
      <div>
        <label>{field.label}</label>
        <input
          type="file"
          {...field.input}
        />
      </div>
    );
  }

  renderDatePicker({input, placeholder, defaultValue, meta: {touched, error} }) {
    return(
      <div>
          <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null} />
          {console.log(moment(input.value))}
          {touched && error && <span>{error}</span>}
      </div>
    );
  }

  onSubmit(values) {
    console.log("values:    " + JSON.stringify(values));
  }


  //Title, Description, expiration date, picList {pic, info}, videos
  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label = "Title"
          name = "title"
          component = {this.renderField}
        />
        <Field
          label = "Description"
          name = "description"
          component = {this.renderField}
        />
        <Field
          label = "ExpirationDate"
          name = "expirationDate"
          component = {this.renderDatePicker}
          format={(value, name) => value === '' ? null : (typeof value === 'string') ? new Date(value) : value}
        />
        <Field
          label = "Upload"
          name = "upload"
          component = {this.renderUploadField}
        />
        <button type="submit" className="btn btn-primary">submit</button>
      </form>
    );
  }
}

function validate(values){
  // console.log("values:    " + JSON.stringify(values));
  const errors = {};
  if(!values.title){
    errors.title = "Please enter a title";
  }
  if(!values.description){
    errors.description = "Please enter a description";
  }
  if(!values.expirationDate){
    errors.expirationDate = "Please enter a date";
  }
  if(values.expirationDate < Date.now()){
    errors.expirationDate = "The date must be in the future";
  }


  return errors;
}

export default reduxForm({
  validate,
  form: 'ProjectNewFrom'
})(ProjectNew);
