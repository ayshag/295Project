import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import '../../App.css';

import Button from '@material-ui/core/Button'
import {button} from "../../styles/button";
import {signupForm} from "../../styles/signupForm";
import {container} from "../../styles/container";
import * as inputField from  "../../styles/inputField";
import { Link, Redirect } from "react-router-dom";
import * as authLeft from "../../styles/authLeft";
import LiveIcon from '@material-ui/icons/Videocam';
import HistoryIcon from '@material-ui/icons/MissedVideoCall';
import SummaryIcon from '@material-ui/icons/ArtTrack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import * as errorStyles from "../../styles/error";
import axios from 'axios';
import backendURL from '../../backendUrl';

class SignUp extends Component {

    constructor(props){
        super(props);       
        this.signup = this.signup.bind(this);
        this.state ={
            redirectVar :null,
            message : null
        }
    }
 
    
    renderField(field) {
     
        return (
            <div>
                <input style= {field.style} required placeholder={field.placeholder} type={field.type} {...field.input} />
            </div>  
            
        );
    }

  
 
   componentDidMount()
   {
    
   }
    signup = (e) => {
        e.preventDefault();
        const data = {
            "fname" : e.target[0].value,
            "lname" : e.target[1].value,
            "org" : e.target[2].selectedIndex,
            "mobile" : e.target[3].value,
            "email" : e.target[4].value,
            "password" : e.target[5].value,
        }
        axios.post(backendURL + "/signup", data).then(response => {
            if(response.data.message === "created")
            {
                sessionStorage.setItem("user", data.email);
                this.setState({redirectVar : <Redirect to="/live-surveillance"/>});
            }
            else if(response.data.message === "preexisting")
                this.setState({message : "Account with this email already exists. Please try again."})
        })
    }
    displayIcon(index)  {
        switch(index)
        {
            case 0 : return <LiveIcon style={authLeft.icon}/> ; 
            case 1 : return <HistoryIcon style={authLeft.icon}/>;
            case 2 : return <SummaryIcon style={authLeft.icon} />;
        }
    }
    render() {

              return (

            <div>
                {this.state.redirectVar}
            
                  <table>
                      <tr>
                          <td>
                               
                          <div style={authLeft.container}>
                                  <div>
                                    <div style={authLeft.logo}>Real Time Video Analytics</div>
                                    <div style={authLeft.logo}>for Threat Detection</div> 
                                  </div>
                                  
                                  <p style={authLeft.intro}>Displays live surveillance, past surveillance <br></br> videos and summary of detected threats</p>
                            
                    <List>
              {['View Live Surveillance Feed', 'View Surveillance History', 'View Detected Threat Details' ].map((text, index) => (
                <ListItem style={authLeft.item}  key={text} >
                  <ListItemIcon>{this.displayIcon(index)}</ListItemIcon>
                  {text}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                   
                </ListItem>
                 
              ))}
            
             </List> 
                                </div>
                          </td>
                          <td>
            <div style={container} >
                 <form  style={signupForm} onSubmit={this.signup}>
                        <h3 style={{color: "rgb(0, 56, 83)", marginBottom : "30px", fontSize: "23px"}}>Sign Up</h3>
                       <table>
                        <tr><td>
                                <Field 
                                    placeholder="First Name"
                                    name="firstname"
                                    style= {inputField.shortLeftInput}
                                    type = "text"
                                    component={this.renderField}
                                /></td>                                
                              <td> 
                               <Field
                                    placeholder="Last Name"
                                    name="lastname"
                                    style={inputField.shortRightInput}
                                    type="text"
                                    component={this.renderField}
                                />
                               </td>
                               </tr></table>
                               <select
                                    
                                    name="organization"
                                    style={inputField.selectInput}
                                                                                                    
                                ><option value="SJPD">San Jose Police Department</option>
                                 <option value="SJSU UPD">SJSU University Police Department</option></select>
                                <Field
                                    placeholder="Mobile Number"
                                    name="number"
                                    style={inputField.longInput}
                                    type = "text" 
                                    component={this.renderField}
                                                                   
                                />
                                <Field
                                    placeholder="Email"
                                    name="email"
                                    style={inputField.longInput}
                                    type = "text"
                                    component={this.renderField}
                                   
                                />
                               
                                <Field
                                    placeholder="Password"
                                    name="password"
                                    style={inputField.longInput}
                                    type = "password"
                                    component={this.renderField}
                                />
                                 <Field
                                    placeholder="Confirm Password"
                                    name="confirm"
                                    style={inputField.longInput}
                                    type = "password"
                                    component={this.renderField}
                                />
                                <Button  style={button} type="submit" fullWidth variant="contained">Sign Up</Button>
                                <p style={errorStyles}>{this.state.message}</p>
                                Already Have an Account?  <Link to={'/signin'} >Sign In</Link>
                            </form>
                           
                        </div>
                        </td>
                        </tr>
                        </table>
                        </div>

        );
    }
}




export default reduxForm({
    form: "SignupForm"
})(SignUp);  
