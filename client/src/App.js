/** @format */

import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import Landing from "./Components/Layout/Landing";
import Alert from "./Components/Layout/Alert";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import { loadUser } from "./Action/auth";
import setAuthToken from "./Utills/setAuthToken";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";

import "./App.css";

if (localStorage.token) {
  console.log("app.js");
  setAuthToken(localStorage.token);
}

const App = () => {
  const response = axios
    .get("https://graph.facebook.com/862100487311283/ratings", {
      params: {
        access_token:
          "EAAKzSYuzXPoBAFZAgpq8JwsG4DW8xtsqN18fR65SHLunE68w8IqNykfIBAwQw8YWQdg5MC8LVNpshnDJ9K6ZBiteGAQZCFEAQKe3rTp4fyApDp8aq59xwaA1UTAfwjJLMdT2fkurN6yBIuvrgNIIRgOKXzb1UXZA0d626MtHFSHjOpiqy35c",
      },
    })

    .then((response) => {
      console.log(response.data);
    });
  console.log(response.data);
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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
