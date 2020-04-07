import React, { Component } from "react";
import '../../App.css';
import LeftDrawer from '../Drawer/Drawer';
import * as videoStyles from  "../../styles/video";
import axios from 'axios';
import { connect } from "react-redux";
import Timer from './Timer';
import { SignalingClient } from 'amazon-kinesis-video-streams-webrtc';
import backendURL from '../../backendUrl';
import { Redirect } from "react-router-dom";


class LiveSurveillance extends Component {

    constructor(props){
        super(props); 
        if(this.props.allThreats.length == 0)
             this.props.threats();
        
    }
    componentDidMount(){
        this.props.surveillance();
       
       // console.log("user : "  + sessionStorage.getItem("user"))
       // if(sessionStorage.getItem("user") == null)
         //   this.setState({redirectVar : <Redirect to= "/signin"/>})
       
    }
    componentWillMount (){
       
    }
    render() {
        var date = (new Date().getMonth() + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear();
        var location = "37.3352° N, 121.8811° W";
        var city = "San Jose"
        var camera = "A103";
       
            return (
            <div  style={videoStyles.background} >
                
                <div  style={videoStyles.videoContainer}  >
                <LeftDrawer></LeftDrawer>
                <div style={videoStyles.videoFrame}>
                    <iframe style={videoStyles.video} src={''+this.props.link} width='100%;' height='500px'></iframe>
                </div>
                {/*   <iframe style={videoStyles.video} width="700px" height="400px" src="https://295-videos.s3.us-east-2.amazonaws.com/San-Jose-16th-Oct-2019.mp4"></iframe> */}
                    <div style = {videoStyles.videoInfo}>{/* <Timer></Timer> */}<h5> Date: {date} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Location: {location} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; City: {city}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Camera: {camera}</h5></div>
                
                </div>
    
            </div> 

            );
    
    }
}


const mapStateToProps = state =>{
   
    return {
        link : state.surveillanceReducer.link,
        allThreats : state.threatsReducer.allThreats,
     }
}

const mapDispatchStateToProps = dispatch => {
    
    return {
        surveillance : () => {
            axios.get(backendURL + '/live-surveillance').then(response=>{
                dispatch({type: "surveillance",payload : response.data})
            })
                    
            
        },
        threats : () => {
            axios.get(backendURL + '/all-threats').then(response=>{
                console.log(response.data);
              // const threatIds = response.data;
              //  axios.post(backendURL + '/threat-details', response.data).then(result=>{
              //          console.log(result);
               // })
                dispatch({type: "threats",payload : response.data})
            }) 
        },
    }
}

export default (connect(mapStateToProps,mapDispatchStateToProps)(LiveSurveillance));  
