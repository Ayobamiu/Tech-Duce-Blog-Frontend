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
              <small className="blog-category">{blog.category}</small>
              <div className="blog-title">{blog.title} </div>
              <small className="blog-date">
                <Moment format="YYYY/MM/DD">{blog.createdAt}</Moment>
              </small>
              <p>{blog.body.slice(0, 70)}..</p>
              <small className='blog-views'>{blog.views} views</small>
              
              <Link className='continue-reading' to={`/blogs/${blog._id}`}>Continue reading</Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
