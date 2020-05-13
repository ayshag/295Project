

import React, { Component } from "react";
import '../../App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import * as drawerStyles from "../../styles/drawer"

  class NavBar extends Component {
    constructor(props){
        super(props);       
    }
 
      render(){
        return (
            
          <AppBar style = {drawerStyles.topItem} position="fixed" >
            <Toolbar>
              Real-Time Video Analytics for Threat Detection
            </Toolbar>
          </AppBar>
         
            

        );
    }
}

export default NavBar;  
