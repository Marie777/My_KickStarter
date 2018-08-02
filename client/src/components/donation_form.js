import React, { Component } from 'react';
import { Field , reduxForm, propTypes, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';

class Donation extends Component {

  renderField(field) {
    const {touched, error} = field.meta;
    const className = `form-group ${touched && error ? 'alert alert-danger' : ''}`;
    const type = field.label === "Password" ? "password" : "text";

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
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
    // const {userId} = this.props.match.params;
    const {_id} = this.props.match.params;

    const data = {
      values: {
        ...values
       }
     };
    axios.post(`http://localhost:3001/project/addDonation/${_id}`, data)
      .then(res => {
        console.log(res);
        this.props.history.push(`/`)
        this.props.history.push(`ProjectDisplay/${_id}`)
      });
}


  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label = "DonationAmount"
          name = "donationAmount"
          component = {this.renderField}
        />
        <button type="submit" className="btn btn-primary">submit</button>
      </form>
    );
  }


}

function validate(values){
  const errors = {};
  if(!values.donationAmount){
    errors.donationAmount = "*Please enter a username";
  }
  if(!Number.isInteger(Number.parseInt(values.donationAmount))){
    errors.donationAmount = "*Please enter a number";
  }
  return errors;
}



export default reduxForm({
  validate,
  form: 'ProjectDonation'
})(Donation);
