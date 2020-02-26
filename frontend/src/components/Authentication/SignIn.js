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
import AnalyticsIcon from '@material-ui/icons/BarChart';
import axios from 'axios';
 
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth'; 

import firebaseApp from './FirebaseApp';
import backendURL from '../../backendUrl';

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};


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
             console.log(response.data.message);
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
        case 3 : return <AnalyticsIcon style = {authLeft.icon} />;
    }
}

    render() {
        const {
            user,
            signInWithGoogle,
            
          } = this.props; 
    
       if(user)
          {
             sessionStorage.setItem("user", user);
             this.setState({redirectVar : <Redirect to="/live-surveillance"/>});
            
          }
      
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
                              <p style={authLeft.intro}>Displays live surveillance, summary of <br></br> detected threats and threat analytics</p>
                             {/*  <div> <ListItemIcon>{this.displayIcon(0)}</ListItemIcon> Live Surveillance</div>
                              <p style={authLeft.intro}>Surveillance History</p>
                               <p style={authLeft.intro}>Threat Summary</p>
                              <p style={authLeft.intro}>Threat Analytics</p> 
          */}
                     <List>
               {['View Live Surveillance Feed', 'View Surveillance History', 'View Detected Threat Details', 'View Threat Analytics Based on Time, Location and Severity' ].map((text, index) => (
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
                                     //style={inputField}
                                     placeholder="Email"
                                     name="email"
                                     style={inputField.longInput}
                                     type = "text"  
                                     onChange = {() => this.setState({message : null})}
                                 />
                               
                                 <input
                                      //style={inputField}
                                     placeholder="Password"
                                    name="password"
                                     style={inputField.longInput}
                                     type = "password"
                                     onChange = {() => this.setState({message : null})}
                                 />
                                
                                <Button  style={button} type="submit" fullWidth /* color="primary" */ variant="contained" /*onClick={ () => {axios.post('http://localhost:3001/signin', {data : 'data'})}/*()=> {this.setState({redirectVar : <Redirect to="/live-surveillance"/>})}}*/>Sign In</Button>
                                <p style={errorStyles}>{this.state.message}</p>
                             
                                <Link to={'/'} >Forgot Password?</Link><br></br>
                                Don't have an account? <Link to={'/signup'} >Create one now</Link>
                            </form>
                           
                                 <Button onClick={signInWithGoogle}>Sign in with Google</Button> 

   </div>
                        </td>
                        </tr>
                        </table>
</div> 

        );
    }
}



const mapStateToProps = state =>{
   
    return {
        authFlag : state.signinReducer.authFlag,
        username : state.signinReducer.username,
        password : state.signinReducer.password  
     }
}

const mapDispatchStateToProps = dispatch => {
    return {
        signin : (values) => {
                    dispatch({type: "signin",payload : values})
            
        }
    }
}
export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
  })(connect(mapStateToProps,mapDispatchStateToProps)(SignIn));  


