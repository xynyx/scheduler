import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "index.scss";

import Application from "components/Application";

// Define default base URL for Netlify
if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

ReactDOM.render(<Application />, document.getElementById("root"));
