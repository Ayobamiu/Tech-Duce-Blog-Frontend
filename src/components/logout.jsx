import React, { Component } from "react";
import { logoutUser } from "../services/user";

class Logout extends Component {
  state = {};
  componentDidMount() {
    logoutUser();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
