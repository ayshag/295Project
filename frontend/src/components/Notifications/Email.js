             
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import '../../App.css';

import Button from '@material-ui/core/Button'
import {signupForm} from "../../styles/signupForm";
import {container} from "../../styles/container";
import * as inputField from  "../../styles/inputField";
import {button} from "../../styles/button";
import emailjs from 'emailjs-com';
import moment from 'moment';
class Email extends Component {

    constructor(props) {
        super(props);
        this.state = { subject: 'Threat Detection Alert', content:'Threat Detected', name: 'Aysha Godil', email: 'ayshagodil@gmail.com, ashgodil@gmail.com' };
   
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputChange = this.inputChange.bind(this);
      }
    
    inputChange =(e) =>
    {
        this.setState()
        {
        //  email: e.target.value
        }
    }


    render() {
        return (
              <>
              
              <input type="text" onChange={this.inputChange}></input>
              <input type="button" value="Submit"  onClick={this.handleSubmit} />
              </>
          
          )
    }
    handleChange(event) {
    this.setState({feedback: event.target.value})
  }
  handleSubmit () {
 
	const templateId = 'email';

    this.sendEmail(templateId,{subject: this.state.subject, content:this.state.content,email: this.state.email})
  }

  sendEmail (templateId, info) {
    window.emailjs.send('gmail', templateId,info)
    .then(console.log('Success! Sent at : ' + moment()
    .utcOffset('-07:00')
    .format('YYYY-MM-DD hh:mm:ss a')))
  	.catch(error => console.error('Error found:', error))
  }
}

export default Email;  
