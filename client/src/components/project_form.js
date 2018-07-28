import React, { Component } from 'react';
import { Field , reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Panel,
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

class ProjectNew extends Component {

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
// {console.log(moment(input.value))}
  renderDatePicker({input, placeholder, defaultValue, meta: {touched, error} }) {
    const className = `form-group ${touched && error ? 'alert alert-danger' : ''}`;

    return(
      <div className={className}>
          <label>Expiration date</label>
          <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null} />
          {touched && error && <span>{error}</span>}
      </div>
    );
  }



  renderDropzoneInput(field) {
    const files = field.input.value;
    return (
        <div className="text-center">
          <Grid>
            <Row>
          <Dropzone
              style={{
                width: '600px',
                height: '200px',
                borderWidth: '2px',
                borderColor: 'rgb(102, 102, 102)',
                borderStyle: 'dashed',
                borderRadius: '5px',
                padding: '200px',
                margin: '30px'
              }}
              name={field.name}
              onDrop={(filesToUpload, e) => {
                field.input.onChange(filesToUpload);
                console.log(field);
              }}
              maxSize={5242880}
              multiple={true}
              accept={'image/*'}
              className="drop-zone"
          >
            {({isDragActive, isDragReject, acceptedFiles, rejectedFiles}) => {
              if (isDragActive) {
                return 'This file is authorized';
              }
              if (isDragReject) {
                return 'This file is not authorized';
              }
              return acceptedFiles.length || rejectedFiles.length
                  ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
                  : 'Try dropping some files.';
            }}
          </Dropzone>
          {field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span>}
          {
            files && Array.isArray(files) && (
                <ul>
                  {files.map((file, i) =>
                      <li key={i}>
                        <img key={i} className="img-thumbnail"
                             src={file.preview} alt="preview"/>
                        <p>{file.name}</p>
                      </li>,
                  )}
                </ul>
            )}
            </Row>
            <Row>
            </Row>
          </Grid>
        </div>
    );
  }


  onSubmit(values) {
    // const fd = new FormData();
    // fd.append('image',values.images[0].preview);
    // axios.post('', fd)
    //   .then(res => {console.log(res)});
    // debugger;
    console.log("values react:    " + JSON.stringify(values));
    // axios.post('http://localhost:3001/project/', {test: 1})
    //   .then(res => {console.log(res)});
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
          label = "Amount"
          name = "amount"
          component = {this.renderField}
        />
        <Field
          label = "ExpirationDate"
          name = "expirationDate"
          component = {this.renderDatePicker}
          format={(value, name) => value === '' ? null : (typeof value === 'string') ? new Date(value) : value}
        />
        <Field
          label="Images"
          name="images"
          component={this.renderDropzoneInput}
        />
        <Field
          label = "Explanation"
          name = "explanation"
          component = {this.renderField}
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
    errors.title = "*Please enter a title";
  }
  if(!values.description){
    errors.description = "*Please enter a description";
  }
  if(!values.explanation){
    errors.explanation = "*Please enter a explanation";
  }
  if(!values.requiredMoney){
    errors.requiredMoney = "*Please enter amount of money required";
  }
  if(!values.expirationDate){
    errors.expirationDate = "*Please enter a date";
  }
  if(values.expirationDate < Date.now()){
    errors.expirationDate = "*The date must be in the future";
  }


  return errors;
}

export default reduxForm({
  validate,
  form: 'ProjectNewFrom'
})(ProjectNew);
