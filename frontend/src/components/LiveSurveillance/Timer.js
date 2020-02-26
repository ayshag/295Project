import React, { Component } from "react";
import '../../App.css';
import * as videoStyles from  "../../styles/video";
import axios from 'axios';

import { connect } from "react-redux";



class Timer extends Component {

    constructor(props){
        super(props); 
    }
    componentDidMount(){
        this.interval = setInterval(() => {
            this.props.updateTime ();
        }, 1000); 
    }
    componentWillUnmount() { 
        clearInterval(this.interval);
    }

    render() {
        return (
            <div><h3 style={videoStyles.timer}> {(this.props.time) ? this.props.time.toLocaleTimeString(): new Date().toLocaleTimeString()}</h3>
              
            </div>


   

        );
    }
}


const mapStateToProps = state =>{
   
    return {
        time : state.surveillanceReducer.time
     }
}

const mapDispatchStateToProps = dispatch => {
    return {
        updateTime : () => {
         
                dispatch({type: "updateTime"})
            
                    
            
        }
    }
}

export default (connect(mapStateToProps,mapDispatchStateToProps)(Timer));  
