import React from 'react';
import LayoutPage from './layout/Layout';
import 'antd/dist/antd.css';
import {isLoggedIn} from './auth.js';
import { PrivateRoute } from "./PrivateRoute";
import Login from './Account/login';
import RegistrationForm from './Account/SignUp';
import { BrowserRouter as Router, Route } from "react-router-dom";



function Index() {
    return (
        <Router>
        <PrivateRoute exact isloggedin={isLoggedIn()} path="/" component={LayoutPage} />
        <PrivateRoute exact isloggedin={isLoggedIn()} path="/staff" component={LayoutPage} />
        <PrivateRoute exact isloggedin={isLoggedIn()} path="/setting" component={LayoutPage} />
        <PrivateRoute exact isloggedin={isLoggedIn()} path="/detail-staff" component={LayoutPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={RegistrationForm} />
        </Router>
    );
}

export default Index;

