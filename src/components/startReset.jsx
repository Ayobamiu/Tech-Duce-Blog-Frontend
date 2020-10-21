import React, { Component } from "react";
import { startPasswordReset } from "../services/user";
import { toast } from 'react-toastify';

class StartReset extends Component {
  state = { email: "" };
  StartReset = async (e) => {
    const email = this.state.email;
    try {
      await startPasswordReset(email);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast("Server issues, try again");
      }
    }
  };
  handleChange = (e) => {
    e.preventDefault();
    const email = e.target.value;
    this.setState({ email });
  };
  render() {
    return (
      <div className="start-reset">
        <h1>Start Password Reset</h1>
        <form onSubmit={this.StartReset}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Account Email"
            onChange={this.handleChange}
          />
          <input type="submit" value="Start Reset" />
        </form>
        <small>We will send a password reset link to your email</small>
      </div>
    );
  }
}

export default StartReset;
