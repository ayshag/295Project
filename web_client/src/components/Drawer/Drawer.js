
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
import SettingsIcon from '@material-ui/icons/Settings';
import SignoutIcon from '@material-ui/icons/PowerSettingsNew';
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import compose from 'recompose/compose';
import axios from 'axios';
import { connect } from "react-redux";
import backendURL from '../../backendUrl';


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
              {['Live Surveillance', 'Surveillance History', 'Threat Summary' , 'Settings' ,'Sign Out'].map((text, index) => (
                <ListItem style={drawerStyles.listItem} button key={text}  onClick={() => {this.redirect(index)}}>
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
        case 3 : return <SettingsIcon style = {drawerStyles.icon} />;
        case 4 : return <SignoutIcon style = {drawerStyles.icon}/>;
    }
}

 redirect(index){
    var redirectTo = null;
    
   
    switch(index)
    {
        case 0 : redirectTo = <Redirect to="/live-surveillance"/>; break;
        case 1 : redirectTo = <Redirect to="/surveillance-history"/>; break;
        case 2 : this.props.threats(); redirectTo = <Redirect to="/search-threats"/>; break;
        case 3 : redirectTo = <Redirect to="/settings"/>; break;
        case 4 :  redirectTo = <Redirect to="/signin"/>; sessionStorage.setItem("user", null);
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


const mapStateToProps = state =>{
   
  return {
      allThreats : state.threatsReducer.allThreats
   }
}

const mapDispatchStateToProps = dispatch => {
  
  return {
     
      threats : () => {
        var threatsData = [];
      
            axios.get(backendURL + '/threat-details').then(result=>{
           
                threatsData = result.data;
                dispatch({type: "threats",payload : threatsData})
            })
   

      },
  }
}

export default compose(
  withStyles(styles)
)(connect(mapStateToProps,mapDispatchStateToProps)(LeftDrawer));


