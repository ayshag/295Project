import React, { Component } from "react";
import { connect } from "react-redux";
import '../../App.css';

import Button from '@material-ui/core/Button'
import {signupForm} from "../../styles/signupForm";
import {signincontainer} from "../../styles/container";
import * as authLeft from "../../styles/authLeft";
import * as inputField from  "../../styles/inputField";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import {button} from "../../styles/button";
import * as errorStyles from "../../styles/error";
import { Link, Redirect } from "react-router-dom";
import LiveIcon from '@material-ui/icons/Videocam';
import HistoryIcon from '@material-ui/icons/MissedVideoCall';
import SummaryIcon from '@material-ui/icons/ArtTrack';
import axios from 'axios';
import backendURL from '../../backendUrl';


class SignIn extends Component {

    constructor(props){
      super(props);       
      this.signin = this.signin.bind(this);
      this.state ={
          redirectVar :null,
          message : null
      }
    }
 
    signin = (e) => {
        e.preventDefault();
        
        const data = {
            "email" : e.target[0].value,
            "password" : e.target[1].value
        }

         axios.post(backendURL + '/signin', data).then(response =>{
             if(response.data.message === "match")
             {
                sessionStorage.setItem("user", data.email);
                this.setState({redirectVar : <Redirect to="/live-surveillance"/>});
                
             }
             else if(response.data.message === "no-match")
                this.setState({message : "Incorrect password. Please try again."})
             else if(response.data.message === "no-user")
                this.setState({message : "Account with this email does not exist. Please try again."})
             else
                console.log("Error");
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
             
             <div >      
                   <table>
                       <tr>
                           <td>         
                               <div style={authLeft.container}>
                                   <div>
                                     <div style={authLeft.logo}>Real Time Video Analytics</div>
                                     <div style={authLeft.logo}>for Threat Detection</div> 
                                   </div>
                                   <div>
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
                  </div>
                           </td>
                           <td>
             <div style={signincontainer} >
                 {this.state.redirectVar}
                  <form  style={signupForm}onSubmit={this.signin}>
                         <h2 style={{color: "rgb(0, 56, 83)", marginBottom : "30px", fontSize: "23px"}}>Sign In</h2>
                       
                                 <input
                                     placeholder="Email"
                                     name="email"
                                     style={inputField.longInput}
                                     type = "text"  
                                     onChange = {() => this.setState({message : null})}
                                 />
                               
                                 <input
                                     placeholder="Password"
                                    name="password"
                                     style={inputField.longInput}
                                     type = "password"
                                     onChange = {() => this.setState({message : null})}
                                 />
                                
                                <Button  style={button} type="submit" fullWidth  variant="contained">Sign In</Button>
                                <p style={errorStyles}>{this.state.message}</p>
                             
                               Don't have an account? <Link to={'/signup'} >Create one now</Link>
                            </form>
                         </div>
                      </td>
                    </tr>
                 </table>
          </div> 

        );
    }
}




export default SignIn;  


