import React, { Component } from "react";
import '../../App.css';
import LeftDrawer from '../Drawer/Drawer';
import * as imageStyles from  "../../styles/image";
import * as videoStyles from  "../../styles/video";
import axios from 'axios';
import { connect } from "react-redux";
import * as threats from "./Threats";
import backendURL from '../../backendUrl';

class ThreatSummary extends Component {

    constructor(props){
        super(props); 
              
    }
    componentDidMount(){
      //  this.props.summary();
    }
    render() {
        var threatDetails = {};
        /*switch(this.props.id)
        {
            case 1: threatDetails = threats[0]; break
            case 2: threatDetails = threats[1]; break
            case 3: threatDetails = threats[2]; break
            case 4: threatDetails = threats[3]; break
            case 5: threatDetails = threats[4]; break
            case 6: threatDetails = threats[5]; break
            case 7: threatDetails = threats[6]; break
            case 8: threatDetails = threats[7]; break


        }*/

        var date = (new Date().getMonth() + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear();
        var location = "37.3352° N, 121.8811° W";
        var city = "San Jose"
        var camera = "A103";
        var certainty = "93%";
        var severity = "High";


        return (
        <div  style={videoStyles.background} >
         
           
            <div  style={videoStyles.videoContainer}  >
            <LeftDrawer></LeftDrawer>
            <div style={videoStyles.videoFrame}>
                <img style={videoStyles.video} src={''+this.props.link} width='100%;' height='500px'></img>
            </div>
              {/*   <iframe style={videoStyles.video} width="700px" height="400px" src="https://295-videos.s3.us-east-2.amazonaws.com/San-Jose-16th-Oct-2019.mp4"></iframe> */}
                <div style = {videoStyles.videoInfo}><h5> Date: {date} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Location: {location} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; City: {city}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Camera: {camera} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Severity: {severity}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Certainty: {certainty}</h5></div>
              
            </div>
   
        </div> 

        );
    }
}


const mapStateToProps = state =>{
   
    return {
        link : state.threatsReducer.link,
        id : state.threatsReducer.id
     }
}

const mapDispatchStateToProps = dispatch => {
    return {
        summary : () => {
            axios.get(backendURL + '/threat-summary').then(response=>{
                dispatch({type: "summary",payload : response.data})
            })
                    
            
        }
    }
}

export default (connect(mapStateToProps,mapDispatchStateToProps)(ThreatSummary));  
