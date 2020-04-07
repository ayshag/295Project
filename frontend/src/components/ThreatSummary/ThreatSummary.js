import React, { Component } from "react";
import '../../App.css';
import LeftDrawer from '../Drawer/Drawer';
import * as imageStyles from  "../../styles/image";
import * as videoStyles from  "../../styles/video";
import axios from 'axios';
import { connect } from "react-redux";
import * as threats from "./Threats";
import backendURL from '../../backendUrl';
import { Modal} from 'reactstrap';
import { ModalHeader} from 'reactstrap';
import {ModalBody} from 'reactstrap';
import { Link } from "react-router-dom";
import * as styles from "../../styles/settings"; 
import * as modalStyles from "../../styles/modal";
import ModalExample from "./ModalExample";
class ThreatSummary extends Component {

    constructor(props){
        super(props); 
        this.state = {
            modalIsOpen : false
        }
        this.toggleModal = this.toggleModal.bind(this);

    }
    componentDidMount(){
      //  this.props.summary();
    }
    toggleModal = (e) =>{
        console.log(this.state.modalIsOpen);
        this.setState({modalIsOpen : !this.state.modalIsOpen});
    }
    render () {
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
        console.log(this.state.modalIsOpen);
        var closeModal =  <button className="close" onClick={this.toggleModal}>Close this modal and check if it works or don't do it but check it if works </button>;
        return (
            <div>
                
        <div  style={videoStyles.background} >
         
           
            <div  style={videoStyles.videoContainer}  >
            <LeftDrawer></LeftDrawer>
            <div style={videoStyles.videoFrame}>
        
                <img style={videoStyles.video} src={''+this.props.allThreats[this.props.id].link} width='100%;' height='500px'></img>
            </div>
              {/*   <iframe style={videoStyles.video} width="700px" height="400px" src="https://295-videos.s3.us-east-2.amazonaws.com/San-Jose-16th-Oct-2019.mp4"></iframe> */}
                <div style = {videoStyles.videoInfo}><h5> Date: {this.props.allThreats[this.props.id].date} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Location: {this.props.allThreats[this.props.id].location} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; City: {this.props.allThreats[this.props.id].city}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Camera: {this.props.allThreats[this.props.id].camera_id} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Severity: {this.props.allThreats[this.props.id].severity}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Certainty: {this.props.allThreats[this.props.id].certainty}</h5>
                <div><h5>Certain this is not a threat? <Link onClick = {this.toggleModal}>Send Feedback Now</Link></h5>
               
                </div>
                </div>
              
            </div>
            <Modal isOpen={this.state.modalIsOpen} toggle={this.toggleModal} >
        <ModalHeader><button className="close" onClick={this.toggleModal}>&times;</button></ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
       
      </Modal>        </div> 
        
</div>
        );
    }
}


const mapStateToProps = state =>{
   
    return {
        link : state.threatsReducer.link,
        id : state.threatsReducer.id,
        allThreats : state.threatsReducer.allThreats
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
