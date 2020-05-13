/** @format */

import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    console.log(token);
    delete axios.defaults.headers.commom["x-auth-token"];
  }
};
export default setAuthToken;
