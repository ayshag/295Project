import React, { Component } from "react";
import '../../App.css';
import LeftDrawer from '../Drawer/Drawer';
import * as videoStyles from  "../../styles/video";
import axios from 'axios';
import { connect } from "react-redux";
import backendURL from '../../backendUrl';
import { Redirect } from "react-router-dom";
import ReactHLS from 'react-hls';
import Hls from "hls.js";
import $ from "jquery";
import AWS from "aws-sdk";
import * as awsConfig from "../../aws-config/aws";

class LiveSurveillance extends Component {

    constructor(props){
        super(props); 
        if(sessionStorage.getItem("user") == null || sessionStorage.getItem("user") == "null")
       {
           this.state = {
                redirectVar :  <Redirect to= "/signin"/>
           }
       }
       else{
        
           this.state = {
               redirectVar :  null
           }

    
       }
        
    }
  
    render() {
        
        var date = (new Date().getMonth() + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear();
        var location = "MLK Library Main entrance, San Jose, CA";
        var camera = "Camera001";
       
        var streamName = 'threatStream';
        var playbackMode = 'LIVE';

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
                        TimestampRange: playbackMode === "LIVE" ? undefined : {
                            StartTimestamp: new Date($('#startTimestamp').val()),
                            EndTimestamp: new Date($('#endTimestamp').val())
                        }
                    },
                   
                }, function(err, response) {
                    if (err) { return console.error(err); }
                    
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
                           <video style={videoStyles.videoDisplay} id="hlsjs"  controls autoPlay></video>

                      </div> 
                 <div  style={videoStyles.videoContainer}  >

                 
                   <div style = {videoStyles.liveVideoInfo}>{/* <Timer></Timer> */}<h5> Date: {date} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Location: {location}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Camera: {camera}</h5></div>
               
               </div>
          
                
            </div> 

            );
    
    }
}



export default LiveSurveillance;  
