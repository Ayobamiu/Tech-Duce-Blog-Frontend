import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getLoggedInUser } from "./../services/user";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <div className="navbar">
        <NavLink className="logo" to="/">
          <h1>TechBlog</h1>
        </NavLink>
        <NavLink className="navbar-signup" to="/blogs/add">
          Create Post
        </NavLink>
        {!getLoggedInUser() && (
          <NavLink className="navbar-signup" to="/Signup">
            Sign Up
          </NavLink>
        )}
      </div>
    );
  }
}

export default NavBar;
