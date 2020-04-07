import React, { Component } from "react";
import '../../App.css';
import LeftDrawer from '../Drawer/Drawer';
import axios from 'axios';
import { connect } from "react-redux";
import * as inputField from  "../../styles/inputField";
import * as threatDisplayStyles from "../../styles/threatimages";
import Button from '@material-ui/core/Button'
import {searchButton} from "../../styles/button";
import * as radioStyles from "../../styles/searchRadio";
import * as searchError from "../../styles/searchError";
import { Field, reduxForm } from "redux-form";
import {  Redirect } from "react-router-dom";
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import * as threatDetails from "./Threats";

import io from "socket.io-client";
import backendURL from "../../backendUrl";

class SearchThreats extends Component {

    constructor(props){
        super(props); 
       if(this.props.allThreats.length == 0)
             this.props.threats();
       this.state ={
        redirectVar :null,
    } 
         this.search = this.search.bind(this);
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
    search = (e) =>{
        e.preventDefault();
        var validSearch = true;
        if(e.target.searchQuery.value.length === 0)
        {
            this.props.searchError("query");
            validSearch = false;
        }
       
        var checked;
        if(e.target.dateRadio.checked)
            checked = "date";
        else if(e.target.cityRadio.checked)
            checked = "city";
        else if(e.target.locationRadio.checked)
            checked = "location";
        else if(e.target.severityRadio.checked)
            checked = "severity";
        else if(e.target.certaintyRadio.checked)
            checked = "certainty";
        else
        {
            this.props.searchError("radio");
            validSearch = false;
        }

        if(validSearch)
        {
            var searchQuery ={
                query : e.target.searchQuery.value,
                checked : checked
            }
            this.props.search(searchQuery);
        }

    }
    render() {
        console.log(this.props.displayThreats);
  
    var threatsDisplay=[] ;
    /*var threatsDisplay =  this.props.allThreats.map((threat) => (
                
            <td>
              <img src ={threat} style={threatDisplayStyles.threatImage}></img>
            </td> 
         
         )) ;*/
         
         for(var i = 0; i<this.props.displayThreats.length; i++)
            {
                
                 const index =i;
                threatsDisplay.push(<td></td>);
                threatsDisplay.push(<img src ={this.props.displayThreats[index].link} style={threatDisplayStyles.threatImage} onClick={()=>{this.props.threatsummary(index) ; this.setState({redirectVar : <Redirect to="/threat-summary"/>})}}></img>);
                threatsDisplay.push(<div style={threatDisplayStyles.threatDetails}>
                    <table>
                    <tr>
                        <td><b>Date</b></td>
                        <td style={threatDisplayStyles.threatDetailsPadding}>{this.props.displayThreats[index].date/*threatDetails.threatDetails.threats[i].date*/}</td>
                    </tr>
                    <tr>
                        <td><b>Location</b></td>
                        <td style={threatDisplayStyles.threatDetailsPadding}>{this.props.displayThreats[index].location}</td>
                    </tr>
                    <tr>
                        <td><b>City</b></td>
                        <td style={threatDisplayStyles.threatDetailsPadding}>{this.props.displayThreats[index].city}</td>
                    </tr>
                    <tr>
                        <td><b>Severity</b></td>
                        <td style={threatDisplayStyles.threatDetailsPadding}>{this.props.displayThreats[index].severity}</td>
                    </tr>
                    <tr>
                        <td><b>Certainty</b></td>
                        <td style={threatDisplayStyles.threatDetailsPadding}>{this.props.displayThreats[index].certainty}</td>
                    </tr>
           
                </table>
                </div>)
                if(i+1<this.props.displayThreats.length && (i+1)%4 ==0)
                    threatsDisplay.push(<tr></tr>);
            }
    
        return (
        <div   >
            <LeftDrawer></LeftDrawer>
            <div >
                <form onSubmit = {this.search}>
                    <table >
                        <tr>
                            <td>
                                <input placeholder="Search by date, city, location, severity or certainty of threat"
                                       name="searchQuery"
                                       style= {inputField.searchInput}
                                       type = "text"
                                       id = "searchQuery"
                                />
                           </td>
                           <td>
                           <Button style={searchButton} type= "reset" variant="contained" onClick={() => this.props.resetSearch()}>Clear</Button>
                         
                           </td>
                            <td>
                                <Button  style={searchButton} type="submit"  variant="contained" >Search</Button>
                            </td>
                        </tr>
                        <tr >
                                <label style={radioStyles.radioLabel} ><input type="radio" name="searchRadio" id="dateRadio" style={radioStyles.searchRadio}></input>Date</label>
                                <label style={radioStyles.radioLabel} ><input type="radio" name="searchRadio" id="cityRadio"  style={radioStyles.radioMargin}></input>City</label>
                                <label style={radioStyles.radioLabel} ><input type="radio" name="searchRadio" id="locationRadio"  style={radioStyles.radioMargin}></input>Location</label>
                                <label style={radioStyles.radioLabel} ><input type="radio" name="searchRadio" id="severityRadio"  style={radioStyles.radioMargin}></input>Severity</label> 
                                <label style={radioStyles.radioLabel}><input type="radio" name="searchRadio" id="certaintyRadio" style={radioStyles.radioMargin}></input>Certainty</label>  
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
        allThreats : state.threatsReducer.allThreats,
        displayThreats : state.threatsReducer.displayThreats, 
        searchErrorMsg : state.threatsReducer.searchErrorMsg,
        searchError : state.threatsReducer.searchError,
        el : state.threatsReducer.el
     }
}

const mapDispatchStateToProps = dispatch => {
    return {
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

        threatsummary : (id) => {
            
                dispatch({type: "threatsummary",payload : id})
            },
        
        search : (searchQuery) => {
                dispatch({type: "search" , payload: searchQuery})
        }   ,   
        resetSearch :()=>{
            dispatch ({type : "resetSearch"})
        }  ,
        searchError :(type) =>{
            dispatch ({type : "searchError", payload : type})
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
 