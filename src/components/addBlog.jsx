import React, { Component } from "react";
import { getLoggedInUser, getToken } from "./../services/user";
import { addBlog } from "./../services/blog";
import { toast } from "react-toastify";

class AddBlog extends Component {
  state = {
    blog: {},
  };
  handleAddBlog = async (e) => {
    const user = getLoggedInUser();
    e.preventDefault();
    const blog = { ...this.state.blog, owner: user._id };
    try {
      await addBlog(blog);
      window.location = "/";
    } catch (error) {
      toast(error.response.data);
    }
  };
  handleChange = (e) => {
    e.preventDefault();
    const name = [e.target.name];
    const blog = this.state.blog;
    blog[name] = e.target.value;
    this.setState({
      blog,
    });
  };
  render() {
    if (!getLoggedInUser()) window.location = "/login";
    return (
      <div className="add-blog">
        <h1>Add Blog</h1>
        <form onSubmit={this.handleAddBlog}>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Blog title"
            onChange={this.handleChange}
          />
          <textarea
            type="text"
            name="body"
            id="body"
            placeholder="Blog body"
            onChange={this.handleChange}
          />
          
          <select
            name="category"
            id="category"
            onChange={this.handleChange}
            placeholder="categories"
          >
            <option value="">--select category--</option>
            <option value="politics">Politics</option>
            <option value="art">Art</option>
            <option value="culture">Culture</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="entertainment">Entertainment</option>
            <option value="technology">Technology</option>
            <option value="religion">religion</option>
            <option value="financial_market">Financial Market</option>
          </select>
          <input type="submit" value="Add Blog" />
        </form>
      </div>
    );
  }
}

export default AddBlog;
