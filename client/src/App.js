/** @format */

import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import Landing from "./Components/Layout/Landing";
import Alert from "./Components/Layout/Alert";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProfileForm from "./Components/Profile-Form/ProfileForm";
import Register from "./Components/Auth/Register";
import PrivateRoute from "./Components/Routing/PrivateRoute";
import Login from "./Components/Auth/Login";
import { loadUser } from "./Action/auth";
import setAuthToken from "./Utills/setAuthToken";
//Redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // empty bracket will tell useEfect only when the app loaded and will run once. if we will not put empty brackets it will run in a loop
  //another option is to pot paramater inside the brackets and it will run for every state update on the parameter that inside

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className=' container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={ProfileForm}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
