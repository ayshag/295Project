
import React, { Component } from "react";
import '../../App.css';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import * as drawerStyles from "../../styles/drawer";
import LiveIcon from '@material-ui/icons/Videocam';
import HistoryIcon from '@material-ui/icons/MissedVideoCall';
import SummaryIcon from '@material-ui/icons/ArtTrack';
import AnalyticsIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';
import SignoutIcon from '@material-ui/icons/PowerSettingsNew';
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import compose from 'recompose/compose';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth'; 
import firebaseApp from '../Authentication/FirebaseApp';
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};


  const styles = theme => ({
    background: {
      background: "rgb(0, 56, 83)",
      color: "rgb(255,255,255)",
    
    },
  });
  
  
  class LeftDrawer extends Component {

    constructor()
    {
        super();
       this.state = {
        redirectTo : null
       }
     //  this.handleClick = this.handleClick.bind(this);
    }

    render() 
    {
        const {classes, signOut} = this.props;
      
        
        return (
           
            <Drawer style={drawerStyles.drawer} classes={{ paper: classes.background}} variant="permanent" anchor="left">
             {this.state.redirectTo}
            <div style={drawerStyles.topItem}><center>
            <div>REAL TIME VIDEO ANALYTICS</div>
            <div>FOR THREAT DETECTION</div></center></div>
                
                   <List>
              {['Live Surveillance', 'Surveillance History', 'Threat Summary', 'Threat Analytics' , 'Settings' ,'Sign Out'].map((text, index) => (
                <ListItem style={drawerStyles.listItem} button key={text}  onClick={() => {signOut(); this.redirect(index)}}>
                  <ListItemIcon>{this.displayIcon(index)}</ListItemIcon>
                  {text}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                   
                </ListItem>
                 
              ))}
            
             </List>             
            </Drawer> 
    

        );
    }
  
 displayIcon(index)  {
    switch(index)
    {
        case 0 : return <LiveIcon style={drawerStyles.icon}/> ; 
        case 1 : return <HistoryIcon style={drawerStyles.icon}/>;
        case 2 : return <SummaryIcon style={drawerStyles.icon} />;
        case 3 : return <AnalyticsIcon style = {drawerStyles.icon} />;
        case 4 : return <SettingsIcon style = {drawerStyles.icon} />;
        case 5 : return <SignoutIcon style = {drawerStyles.icon}/>;
    }
}

 redirect(index){
    var redirectTo = null;
    
   
    switch(index)
    {
        case 0 : redirectTo = <Redirect to="/live-surveillance"/>; break;
        case 1 : redirectTo = <Redirect to="/live-surveillance"/>; break;
        case 2 : redirectTo = <Redirect to="/search-threats"/>; break;
        case 3 : redirectTo = <Redirect to="/live-surveillance"/>; break;
        case 4 : redirectTo = <Redirect to="/settings"/>; break;
        case 5 :  redirectTo = <Redirect to="/signin"/>; sessionStorage.setItem("user", null);
        break;
    }
    this.setState({
      redirectTo : redirectTo
    })
    
}

  }

  LeftDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
//export default withStyles(styles)(LeftDrawer); 

export default compose(
  withStyles(styles),
  withFirebaseAuth({
    providers,
    firebaseAppAuth,
  })
)(LeftDrawer);


