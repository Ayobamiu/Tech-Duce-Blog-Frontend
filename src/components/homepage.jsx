import React, { Component } from "react";
import { getBlogs } from "./../services/blog";
import Moment from "react-moment";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    blogs: [],
  };
  async componentDidMount() {
    const { data: blogs } = await getBlogs();
    this.setState({
      blogs,
    });
  }
  render() {
    const blogs = this.state.blogs;
    return (
      <div className="home">
        <div className="home-blogs">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog">
              <small>{blog.category}</small>
              <h1>{blog.title} </h1>
              <small>
                <Moment format="YYYY/MM/DD">{blog.createdAt}</Moment>
              </small>
              <p>{blog.body.slice(0, 70)}..</p>
              {blog.views}
              <i className="fa fa-eye"></i>{" "}
              <Link to={`/blogs/${blog._id}`}>Continue reading</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
