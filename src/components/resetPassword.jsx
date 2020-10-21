import React, { Component } from "react";
import { toast } from "react-toastify";
import { resetPassword } from "../services/user";

class ResetPassword extends Component {
  state = {
    data: {},
  };
  submitResetPassword = async (e) => {
    const data = this.state.data;
    e.preventDefault();
    const token = this.props.match.params.token;
    try {
      await resetPassword(token, data.password_one, data.password_two);
      window.location = "/login";
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast("Server issues, try again");
      }
    }
  };
  handleChange = (e) => {
    e.preventDefault();
    const name = [e.target.name];
    const data = this.state.data;
    data[name] = e.target.value;
    this.setState({
      data,
    });
  };
  render() {
    return (
      <div className="reset-password">
        <h1>Reset Password</h1>
        <form onSubmit={this.submitResetPassword}>
          <input
            type="password"
            name="password_one"
            id="password_one"
            placeholder="Enter password"
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password_two"
            id="password_two"
            placeholder="Enter password again"
            onChange={this.handleChange}
          />
          <input type="submit" value="Reset" />
        </form>
      </div>
    );
  }
}

export default ResetPassword;
