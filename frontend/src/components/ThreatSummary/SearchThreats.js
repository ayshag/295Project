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
import {  reduxForm } from "redux-form";
import {  Redirect } from "react-router-dom";

import backendURL from "../../backendUrl";

class SearchThreats extends Component {

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
            if(this.props.allThreats.length == 0)
               this.props.threats();
     
        }

             
       
         this.search = this.search.bind(this);
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
        else if(e.target.cameraRadio.checked)
            checked = "camera_id";
        else if(e.target.locationRadio.checked)
            checked = "location";
   
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
  
    var threatsDisplay=[] ;

         
         for(var i = 0; i<this.props.displayThreats.length; i++)
            {
                
                 const index =i;
                threatsDisplay.push(<td></td>);
                threatsDisplay.push(<img src ={this.props.displayThreats[index].link} style={threatDisplayStyles.threatImage} onClick={()=>{this.props.threatsummary(index) ; this.setState({redirectVar : <Redirect to="/threat-summary"/>})}}></img>);
                threatsDisplay.push(<div style={threatDisplayStyles.threatDetails}>
                    <table>
                    <tr>
                        <td><b>Camera</b></td>
                        <td style={threatDisplayStyles.threatDetailsPadding}>{this.props.displayThreats[index].camera_id}</td>
                    </tr>
                    <tr>
                        <td><b>Date</b></td>
                        <td style={threatDisplayStyles.threatDetailsPadding}>{this.props.displayThreats[index].date/*threatDetails.threatDetails.threats[i].date*/}</td>
                    </tr>
                    <tr>
                        <td><b>Location</b></td>
                        <td style={threatDisplayStyles.threatDetailsPadding}>{this.props.displayThreats[index].location}</td>
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
                                <input placeholder="Search by camera ID, date, location or certainty of threat"
                                       name="searchQuery"
                                       style= {inputField.searchInput}
                                       type = "text"
                                       id = "searchQuery"
                                />
                           </td>
                           <td>
                           <Button style={searchButton} type= "submit" variant="contained" >Search</Button>
                         
                           </td>
                            <td>
                                <Button  style={searchButton} type="reset"  variant="contained" onClick={() => this.props.resetSearch()} >Clear</Button>
                            </td>
                        </tr>
                        <tr >
                                <label style={radioStyles.radioLabel} ><input type="radio" name="searchRadio" id="cameraRadio" style={radioStyles.searchRadio}></input>Camera</label>

                                <label style={radioStyles.radioLabel} ><input type="radio" name="searchRadio" id="dateRadio" style={radioStyles.radioMargin}></input>Date</label>
                                <label style={radioStyles.radioLabel} ><input type="radio" name="searchRadio" id="locationRadio"  style={radioStyles.radioMargin}></input>Location</label>

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
          
                var threatsData = [];
               
                    axios.get(backendURL + '/threat-details').then(result=>{
                     
                        threatsData = result.data;
                        dispatch({type: "threats",payload : threatsData})
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
       
    
        
    }
        
    
}

export default reduxForm({
     form: "SignupForm",
 })(connect(mapStateToProps,mapDispatchStateToProps)(SearchThreats));  
 