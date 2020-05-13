import React, { Component } from "react";
import '../../App.css';
import LeftDrawer from '../Drawer/Drawer';
import * as styles from  "../../styles/settings";
import * as inputStyles from "../../styles/inputField";
import * as buttonStyles from "../../styles/button";
import * as errorStyles from "../../styles/error";
import Button from '@material-ui/core/Button'

import axios from 'axios';
import { connect } from "react-redux";
import backendURL from '../../backendUrl';

class Settings extends Component {

    constructor(props){
        super(props); 
        this.state={
            message : null
        }
        this.updatePassword = this.updatePassword.bind(this);
      
              
    }
  

    updatePassword = (e) => {
        e.preventDefault();
        if(e.target.newpassword.value !== e.target.confirmpassword.value)
            this.setState({message : "Passwords Do Not Match. Please Try Again"});
        else
        {
            const data ={
                user : sessionStorage.getItem("user"),
                oldpassword : e.target.oldpassword.value,
                newpassword : e.target.newpassword.value
            }
            axios.put(backendURL + '/updatepassword', data).then(response=>{
                console.log(response);
                if(response.data.message === "no-match")
                    this.setState({message : "Incorrect Old Password. Please Try Again."})
                else if(response.data.message === "updated")
                    this.setState({message : "Password Updated"});
            })
        }
    }
    render() {
   

        return (
        <div  >
            <LeftDrawer></LeftDrawer>
      
            <div>
                <p style={styles.labelsOne}>
                    Account Settings
                </p>
                <p style={styles.labelsTwo}>
                    Change Password
                </p>
                <form onSubmit={this.updatePassword}>

                <p style={styles.labelsThree}> Confirm Old Password:  <input type="password" required name="oldpassword" style={inputStyles.settingsInput}></input></p>
                <p style={styles.labelsFour}> Enter New Password:  <input type="password" required name="newpassword" style={inputStyles.settingsInput} onChange= {()=>this.setState({message : null})}></input></p>
                <p style={styles.labelsFive}> Confirm New Password:  <input type="password" required name="confirmpassword" style={inputStyles.settingsInput} onChange= {()=>this.setState({message : null})}></input></p>
                <p  style={errorStyles.settingsError}>{this.state.message}</p>
                <Button type="submit" style={buttonStyles.updateButton} variant="contained" >UPDATE</Button>
 
                </form>
    
            </div>
        </div> 

        );
    }
}



export default Settings;  
