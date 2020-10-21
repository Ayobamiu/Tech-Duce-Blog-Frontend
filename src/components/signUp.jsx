import React, { Component } from "react";
import { toast } from "react-toastify";
import { loginInWithToken, registerUser } from "./../services/user";

class SignUp extends Component {
  state = {
    user: {
      username: "",
      full_name: "",
      email: "",
      number: "",
      interests: [],
      bio: "",
      twitter_link: "",
      linkedIn_link: "",
      facebook_link: "",
      medium_link: "",
      password: "",
    },
  };
  handleSignUp = async (event) => {
    event.preventDefault();
    const data = this.state.user;
    try {
      const { data: response } = await registerUser(data);
      const token = response.token;
      loginInWithToken(token);
      window.location = "/";
    } catch (error) {
      if (error.response.status === 400) {
        toast(error.response.data);
      }
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const name = [e.target.name];
    const user = this.state.user;
    user[name] = e.target.value;
    this.setState({
      user,
    });
  };

  handleChangeInArray = (e) => {
    e.preventDefault();
    let interests = [];
    const target = document.getElementById("interests");
    const options = target && target.options;
    for (let index = 0; index < options.length; index++) {
      const option = options[index];
      if (option.selected) {
        interests.push({ interest: option.value } || { interest: option.text });
      }
    }
    const user = this.state.user;
    user.interests = interests;
    this.setState({
      user,
    });
  };
  render() {
    return (
      <div className="signup">
        <h1>Sign up</h1>
        <form onSubmit={this.handleSignUp}>
          <input
            type="text"
            name="username"
            id="username"
            onChange={this.handleChange}
            placeholder="Username"
          />
          <input
            type="text"
            name="full_name"
            id="full_name"
            onChange={this.handleChange}
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email"
            id="email"
            onChange={this.handleChange}
            placeholder="Email"
          />
          <input
            type="number"
            name="number"
            id="number"
            onChange={this.handleChange}
            placeholder="Phone number"
          />
          <label htmlFor="interests">
            <small>
              ** hold <span className="control-key">Cntrl</span> to select
              multiple interests
            </small>
          </label>
          <select
            name="interests"
            id="interests"
            onChange={this.handleChangeInArray}
            placeholder="interests"
            multiple="multiple"
          >
            <option value="politics">Politics</option>
            <option value="art">Art</option>
            <option value="culture">Culture</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="entertainment">Entertainment</option>
            <option value="technology">Technology</option>
            <option value="religion">religion</option>
            <option value="financial_market">Financial Market</option>
          </select>
          <input
            type="text"
            name="bio"
            id="bio"
            onChange={this.handleChange}
            placeholder="Short bio"
          />
          <input
            type="url"
            name="twitter_link"
            id="twitter_link"
            onChange={this.handleChange}
            placeholder="Twitter link"
          />
          <input
            type="url"
            name="linkedIn_link"
            id="linkedIn_link"
            onChange={this.handleChange}
            placeholder="LinkedIn link"
          />
          <input
            type="url"
            name="facebook_link"
            id="facebook_link"
            onChange={this.handleChange}
            placeholder="Facebook link"
          />
          <input
            type="url"
            name="medium_link"
            id="medium_link"
            onChange={this.handleChange}
            placeholder="Medium link"
          />
          <input
            type="password"
            name="password"
            id="password"
            onChange={this.handleChange}
            placeholder="Password"
          />
          <button type="submit">Sign Up</button>
        </form>
        <small>
          Already Registered? <a href="/login">Login</a>
        </small>
      </div>
    );
  }
}

export default SignUp;
