import React, { Component } from "react";
import { deleteUser, getLoggedInUser, logoutUser } from "../services/user";

class DeleteAccount extends Component {
  state = {};
  componentDidMount() {
    logoutUser();
    deleteUser();
    window.location = "/";
  }
  render() {
    if (!getLoggedInUser()) window.location = "/";
    return null;
  }
}

export default DeleteAccount;
