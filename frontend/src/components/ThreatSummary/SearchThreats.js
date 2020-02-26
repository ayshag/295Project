import React, { Component } from "react";
import '../../App.css';
import LeftDrawer from '../Drawer/Drawer';
import axios from 'axios';
import { connect } from "react-redux";
import * as inputField from  "../../styles/inputField";
import * as threatDisplayStyles from "../../styles/threatimages";
import Button from '@material-ui/core/Button'
import {searchButton} from "../../styles/button";
import { Field, reduxForm } from "redux-form";
import {  Redirect } from "react-router-dom";
import * as threatDetails from "./Threats";

import io from "socket.io-client";
import backendURL from "../../backendUrl";

class SearchThreats extends Component {

    constructor(props){
        super(props); 
       
       this.props.threats();
       this.state ={
        redirectVar :null,
    } 
         
    }
    componentDidMount(){

          var socket = io(backendURL);
          socket.on('update', function (update)
          {
                console.log('recvd ' + update.link );
          });
    }
    
    renderField(field) {
     
        return (
            <div>
                <input style= {field.style} required placeholder={field.placeholder} type={field.type} {...field.input} />
            </div>  
            
        );
    }
    render() {
  
    var threatsDisplay=[] ;
    /*var threatsDisplay =  this.props.threatlinks.map((threat) => (
                
            <td>
              <img src ={threat} style={threatDisplayStyles.threatImage}></img>
            </td> 
         
         )) ;*/
         console.log(threatDetails.threatDetails.threats);
         for(var i = 0; i<this.props.threatlinks.length; i++)
            {
                
                threatsDisplay.push(<td></td>);
                threatsDisplay.push(<img src ={this.props.threatlinks[i]} style={threatDisplayStyles.threatImage} onClick={()=>{this.props.threatsummary(i+1) ; this.setState({redirectVar : <Redirect to="/threat-summary"/>})}}></img>);
                threatsDisplay.push(<div style={threatDisplayStyles.threatDetails}>
                    <table>
                    <tr>
                        <td><b>Date</b></td>
                        <td style={threatDisplayStyles.threatDetailsPadding}>{threatDetails.threatDetails.threats[i].date}</td>
                    </tr>
                    <tr>
                        <td><b>Location</b></td>
                        <td style={threatDisplayStyles.threatDetailsPadding}>{threatDetails.threatDetails.threats[i].location}</td>
                    </tr>
                    <tr>
                        <td><b>City</b></td>
                        <td style={threatDisplayStyles.threatDetailsPadding}>{threatDetails.threatDetails.threats[i].city}</td>
                    </tr>
                    <tr>
                        <td><b>Severity</b></td>
                        <td style={threatDisplayStyles.threatDetailsPadding}>{threatDetails.threatDetails.threats[i].severity}</td>
                    </tr>
                    <tr>
                        <td><b>Certainty</b></td>
                        <td style={threatDisplayStyles.threatDetailsPadding}>{threatDetails.threatDetails.threats[i].certainty}</td>
                    </tr>
                </table>
                </div>)
                if(i+1<this.props.threatlinks.length && (i+1)%4 ==0)
                    threatsDisplay.push(<tr></tr>);
            }
    
        return (
        <div   >
            <LeftDrawer></LeftDrawer>
            <div>
                <form>
                    <table>
                        <tr>
                            <td>
                                <Field placeholder="Search by date, city, location, severity or certainty of threat"
                                       name="searchquery"
                                       style= {inputField.searchInput}
                                       type = "text"
                                       component={this.renderField}
                                />
                            </td>
                            <td>
                                <Button  style={searchButton} type="submit"  variant="contained" onClick={()=>console.log("Search Button Clicked")}>Search</Button>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>

            <div>
                {this.state.redirectVar}
                 <table style={threatDisplayStyles.threatImageTable} >
                    {threatsDisplay}
                 </table>
            </div>
   
        </div> 

        );
    }
}


const mapStateToProps = state =>{
   
    return {
        threatlinks : state.threatsReducer.threatlinks,
        el : state.threatsReducer.el
     }
}

const mapDispatchStateToProps = dispatch => {
    return {
        threats : () => {
            axios.get(backendURL + '/all-threats').then(response=>{
                console.log(response.data);
                dispatch({type: "threats",payload : response.data})
            }) 
        },

        threatsummary : (id) => {
            
                dispatch({type: "threatsummary",payload : id})
            },
        
                    
        updateel : () => {
            
            dispatch({type: "updateel",payload : 0})
        }
    
    }
        
    
}

export default reduxForm({
    // validate,
     form: "SignupForm",
 })(connect(mapStateToProps,mapDispatchStateToProps)(SearchThreats));  
 