// import "./assets/style.css";

import React, {Component, cloneElement} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";
import ReactDOM from "react-dom";

import AppContainer from "./container/AppContainer";
/* Original AppContainer is now Appcontainer_original */

import App from "./component/App";
import Main from "./component/Main";
import Login from "./component/main/Login";
import SelectProject from "./component/main/SelectProject";
import ProjectDetail from "./component/main/ProjectDetail";
import UserProjectDetail from "./component/main/UserProjectDetail";
import CreateProject from "./component/main/CreateProject";
import CreateDate from "./component/main/CreateDate";
import LeaveHistory from "./component/main/LeaveHistory";
import History from "./component/main/History";
import WishList from "./component/main/WishList";
import Settings from "./component/main/Settings";
import Payment from "./component/main/Payment";

ReactDOM.render(
  (
  <Router history={browserHistory}>
    <Route component={AppContainer}>
      <Route path="/login" component={Login}/>
      <Route component={App}>
        <Route path="/" component={Main}/>
        <Route path="/select" component={SelectProject}/>
        <Route path="/create" component={CreateProject}/>
        <Route path="/write" component={LeaveHistory}/>
        <Route path="/create/date" component={CreateDate}/>
        <Route path="/project" component={ProjectDetail}/>
        <Route path="/userproject" component={UserProjectDetail}/>
        <Route path="/history" component={History}/>
        <Route path="/wishlist" component={WishList}/>
        <Route path="/settings" component={Settings}/>
        <Route path="/payment" component={Payment}/>
      </Route>
    </Route>
  </Router>
  ), document.getElementById("container"));
