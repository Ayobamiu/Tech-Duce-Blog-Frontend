import React, { Component } from "react";
import { toast } from "react-toastify";
import { loginInWithToken, loginUser } from "./../services/user";

class Login extends Component {
  state = {
    data: {
      email: "",
      password: "",
    },
  };

  handleLogin = async (e) => {
    
    e.preventDefault();
    const data = this.state.data;
    try {
      const { data: response } = await loginUser(data);
      const token = response.token;
      loginInWithToken(token);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast(error.response.data);
      } else {
        toast(error.message);
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
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={this.handleLogin}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <input type="submit" value="Login" />
        </form>
        <small>
          Don't have an account? <a href="/signup">Sign Up</a>{" "}
        </small>
        <hr />
        <small>
          Forgot password? <a href="/forgot-password">Reset password</a>{" "}
        </small>
      </div>
    );
  }
}

export default Login;
