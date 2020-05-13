import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import promise from "redux-promise";
import rootReducer from "./reducers/root";
import SignUp from './components/Authentication/SignUp';
import SignIn from './components/Authentication/SignIn';

import LiveSurveillance from './components/LiveSurveillance/LiveSurveillance';
import SurveillanceHistory from './components/SurveillanceHistory/SurveillanceHistory';

import ThreatSummary from './components/ThreatSummary/ThreatSummary';
import SearchThreats from './components/ThreatSummary/SearchThreats';
import Settings from './components/Settings/Settings';



const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composePlugin(applyMiddleware(promise)));


class App extends Component {
 render() {
  const rootPath = (sessionStorage.getItem("user") == null || sessionStorage.getItem("user") == "null") ? '/signin' : '/live-surveillance';
   return(
      <Provider store = {store}>
       <BrowserRouter>
            <Switch>
            <Route path='/signup' component={SignUp} />
            <Route path='/signin' component={SignIn} />
            <Route path='/live-surveillance' component={LiveSurveillance} />
            <Route path='/surveillance-history' component={SurveillanceHistory} />
            <Route path='/threat-summary' component={ThreatSummary} />
            <Route path='/search-threats' component={SearchThreats} />
            <Route path='/settings' component={Settings} />
            <Redirect from='/' to= {rootPath}></Redirect>
            </Switch>
       </BrowserRouter>
     </Provider> 
   )
 }
}

export default App;
