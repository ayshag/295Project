import React, { Component } from "react";
import '../../App.css';
import LeftDrawer from '../Drawer/Drawer';
import * as videoStyles from  "../../styles/video";
import axios from 'axios';
import { connect } from "react-redux";
import backendURL from '../../backendUrl';
import { Redirect } from "react-router-dom";
import Hls from "hls.js";
import $ from "jquery";
import AWS from "aws-sdk";
import Button from '@material-ui/core/Button';
import DatePicker from 'react-datepicker';
import TimeField from 'react-simple-timefield';
import "react-datepicker/dist/react-datepicker.css";
import * as buttonStyles from "../../styles/button";
import * as awsConfig from "../../aws-config/aws";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

class SurveillanceHistory extends Component {

    constructor(props){
        super(props); 
        var redirectVar;

        if(sessionStorage.getItem("user") == null || sessionStorage.getItem("user") == "null")
       {
            redirectVar =  <Redirect to= "/signin"/>
        
       }
       else{
   
               redirectVar =  null
          
        
    
       }
        this.state = {
            startDate : new Date(),
            endDate : new Date(),
            startTime : '14:30:00',
            endTime : '14:30:00',
            startTimeStamp : null,
            endTimeStamp : null,
            redirectVar : redirectVar
        
        }
       this.render = this.render.bind(this);
        
    }
  
    
    startDateChange = date => 
    {
        this.setState({ startDate : date })
    }
    endDateChange = date => 
    {
        this.setState({ endDate : date })
    }

    startTimeChange = (e) =>
    {
        e.preventDefault();
        
        this.setState({startTime : e.target.value});
    }
    endTimeChange = (e) =>
    {
        e.preventDefault();
        this.setState({endTime : e.target.value});
    }
    convertMonth = month =>
    {
        switch(month)
        {
            case 'Jan' : return 1;
            case 'Feb' : return 2;
            case 'Mar' : return 3;
            case 'Apr' : return 4;
            case 'May' : return 5;
            case 'Jun' : return 6;
            case 'Jul' : return 7;
            case 'Aug' : return 8;
            case 'Sept' : return 9;
            case 'Oct' : return 10;
            case 'Nov' : return 11;
            case 'Dec' : return 12;
        }
    }
    handleSubmit = (e) => 
    {
        e.preventDefault();
        if(this.state.startTime)
        {
            
        var startDate = this.state.startDate.toString().split(' ');
       
        var endDate = this.state.endDate.toString().split(' ');

      var startMonth, endMonth; 
      switch(startDate[1])
        {
            case 'Jan' : startMonth =  '01'; break;
            case 'Feb' : startMonth =  '02';break;
            case 'Mar' : startMonth =  '03';break;
            case 'Apr' : startMonth =  '04';break;
            case 'May' : startMonth =  '05';break;
            case 'Jun' : startMonth =  '06';break;
            case 'Jul' : startMonth =  '07';break;
            case 'Aug' : startMonth =  '08';break;
            case 'Sept' : startMonth =  '09';break;
            case 'Oct' : startMonth =  '10';break;
            case 'Nov' : startMonth =  '11';break;
            case 'Dec' : startMonth =  '12';
        }

        switch(endDate[1])
        {
            case 'Jan' : endMonth =  '01';break;
            case 'Feb' : endMonth =  '02';break;
            case 'Mar' : endMonth =  '03';break;
            case 'Apr' : endMonth =  '04';break;
            case 'May' : endMonth =  '05';break;
            case 'Jun' : endMonth =  '06';break;
            case 'Jul' : endMonth =  '07';break;
            case 'Aug' : endMonth =  '08';break;
            case 'Sept' : endMonth =  '09';break;
            case 'Oct' : endMonth =  '10';break;
            case 'Nov' : endMonth =  '11';break;
            case 'Dec' : endMonth =  '12';
        }
     
        var start = startDate[3]+ '-' + startMonth + '-' + startDate[2] + 'T' + this.state.startTime + '.000Z' ;
        var end = endDate[3]+ '-' + endMonth +'-' +  endDate[2] + 'T' + this.state.endTime + '.000Z' ;
        var data = {
            start : start, 
            end : end
        }
      
       this.setState({
           startTimeStamp : start,
           endTimeStamp : end
       })

    }
    }
   
    render() {
     var startTimeStamp = this.state.startTimeStamp + '';
     var endTimeStamp = this.state.endTimeStamp;
       
        var protocol = 'HLS';
        var streamName = 'threatStream';
        var playbackMode = 'ON_DEMAND';

        var options = {
            accessKeyId: awsConfig.config.accessKeyId,
            secretAccessKey: awsConfig.config.secretAccessKey,
            sessionToken:  undefined,
            region: awsConfig.config.region,
            endpoint: undefined
        }
        var kinesisVideo = new AWS.KinesisVideo(options);
        var kinesisVideoArchivedContent = new AWS.KinesisVideoArchivedMedia(options);
        kinesisVideo.getDataEndpoint({
            StreamName: streamName,
            APIName: "GET_HLS_STREAMING_SESSION_URL"
        }, function(err, response) {
            if (err) { 
                 console.error(err); 
                 return;
            }
            kinesisVideoArchivedContent.endpoint = new AWS.Endpoint(response.DataEndpoint);
            
                kinesisVideoArchivedContent.getHLSStreamingSessionURL({
                    StreamName: streamName,
                    PlaybackMode: playbackMode,
                    HLSFragmentSelector: {
                        FragmentSelectorType: 'SERVER_TIMESTAMP',
                        TimestampRange:  {
                            StartTimestamp: new Date(startTimeStamp),
                            EndTimestamp: new Date(endTimeStamp)
                            
                        }
                    }
                }, function(err, response) {
                    if (err) { 
                         console.log(err); 
                         return;
                    }
                 
               
                        var playerElement = $('#hlsjs');
                        playerElement.show();
                        var player = new Hls();
                        player.loadSource(response.HLSStreamingSessionURL);
                        player.attachMedia(playerElement[0]);
                        player.on(Hls.Events.MANIFEST_PARSED, function() {
                            $('#hlsjs').play();
                        });
                    
                });
        
        });

            return (
           <div>
               {this.state.redirectVar}
                 <LeftDrawer></LeftDrawer>
                 <div style={videoStyles.videoDisplayContainer}  >
                           <video style={videoStyles.videoDisplay} id="hlsjs"  controls ></video>

                      </div> 
                  <div  style={videoStyles.videoContainer}  > 

                 
                   <div style = {videoStyles.historyInput}> 
        <form onSubmit = {this.handleSubmit}>
            <table >
                <tr  >
                    <td  style={videoStyles.colOne}>
                         <h5> Enter Start Date <DatePicker selected = {this.state.startDate} onChange = {this.startDateChange} /> </h5> <h5>Enter Start Time  <TimeField value= {this.state.startTime} onChange={this.startTimeChange} colon=":" showSeconds /> {/*< TimePicker onChange={this.startTimeChange}> </TimePicker>*/}  </h5>
                    </td>
                    <td style={videoStyles.colTwo}>
                          <h5> Enter End Date <DatePicker selected = {this.state.endDate} onChange = {this.endDateChange}/> </h5> <h5> Enter End Time <TimeField  value= {this.state.endTime} onChange={this.endTimeChange} colon=":" showSeconds /> {/* <TimePicker onChange={this.endTimeChange}></TimePicker>*/} </h5>
                    </td>
                    <td>
                          <Button style={buttonStyles.goButton} type="submit">Go</Button>
                    </td>
                </tr>
            </table>
        </form>
    
                                     
               </div>
               </div> 
          
                
            </div> 

            );
    
    }
}


export default SurveillanceHistory;  
