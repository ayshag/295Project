import React, { Component } from "react";
import '../../App.css';
import LeftDrawer from '../Drawer/Drawer';
import * as videoStyles from  "../../styles/video";
import axios from 'axios';
import { connect } from "react-redux";
import backendURL from '../../backendUrl';
import { Link } from "react-router-dom";
import {  Redirect } from "react-router-dom";

class ThreatSummary extends Component {

    constructor(props){
        super(props); 
        this.state = {
            classified: 0,
            link_msg : "Send Feedback Now",
            msg : "Certain this is not a threat?",
            redirectVar : null,
            link2_msg: null
        }
        this.classify = this.classify.bind(this);
        this.cancel = this.cancel.bind(this);

    }
   
    classify(){
        //First Click - Update Message to Request Confirmation
        if(this.state.classified == 0)
            {
                this.setState({
                    classified : 1,
                    link_msg : "Confirm",
                    msg: "Are you sure you want to mark this incident as not a threat?",
                    link2_msg: "Cancel"
                })
                
            }

            //Second Click - Classify and Redirect Page
        if(this.state.classified == 1)
        {
     
            var data = {
                link : this.props.allThreats[this.props.id].link
            }
            this.props.classify(data);
            this.setState({
                redirectVar :  <Redirect to="/search-threats"/>
            })
        }
    }
    //Cancel - Reset Messages
    cancel(){
        this.setState({
            classified: 0,
            link_msg : "Send Feedback Now",
            msg : "Certain this is not a threat?",
            redirectVar : null,
            link2_msg: null
        })
    }
    render () {
    
        return (
            <div>
                {this.state.redirectVar}
                
        <div  style={videoStyles.summaryBackground} >
         
           
            <div  style={videoStyles.summaryContainer}  >
            <LeftDrawer></LeftDrawer>
            <div style={videoStyles.summaryFrame}>
        
                <img style={videoStyles.summaryVideo} src={''+this.props.allThreats[this.props.id].link} width='100%;' height='500px'></img>
            </div>
                <div style = {videoStyles.summaryInfo}>
                    <h5> Camera: {this.props.allThreats[this.props.id].camera_id} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date: {this.props.allThreats[this.props.id].date} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Location: {this.props.allThreats[this.props.id].location} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Certainty: {this.props.allThreats[this.props.id].certainty}</h5>
                     <div><h5>{this.state.msg} &nbsp;&nbsp;&nbsp;<Link onClick = {this.classify}>{this.state.link_msg}</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Link onClick = {this.cancel}>{this.state.link2_msg}</Link></h5> </div>
                
                </div>
              
            </div>
               </div> 
        
</div>
        );
    }
}


const mapStateToProps = state =>{
   
    return {
        link : state.threatsReducer.link,
        id : state.threatsReducer.id,
        allThreats : state.threatsReducer.allThreats,
        redirect : state.threatsReducer.redirect
     }
}

const mapDispatchStateToProps = dispatch => {
    return {
        summary : () => {
            axios.get(backendURL + '/threat-summary').then(response=>{
                dispatch({type: "summary",payload : response.data})
            })          
        },
        classify : (data) =>{
            
            axios.post(backendURL +  '/classify' , data).then(response =>{
                if(response.data.success)
                {
                    dispatch({type: "classify", payload: data})
                }

            })
        }

    }
}

export default (connect(mapStateToProps,mapDispatchStateToProps)(ThreatSummary));  
