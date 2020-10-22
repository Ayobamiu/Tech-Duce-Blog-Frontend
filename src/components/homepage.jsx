import React, { Component } from "react";
import { getBlogs } from "./../services/blog";
import Moment from "react-moment";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    blogs: [],
    loading: true,
  };
  async componentDidMount() {
    const { data: blogs } = await getBlogs();
    this.setState({
      blogs,
      loading: false,
    });
  }
  render() {
    console.log(this.state);
    const { blogs, loading } = this.state;
    return (
      <div className="home">
        <div className="home-blogs">
          {loading ? (
           <div class="loader"></div>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="blog">
                <small className="blog-category">{blog.category}</small>
                <div className="blog-title">{blog.title} </div>
                <small className="blog-date">
                  <Moment format="YYYY/MM/DD">{blog.createdAt}</Moment>
                </small>
                <p className="home-blogs-para">{blog.body.slice(0, 70)}..</p>
                <small className="blog-views">{blog.views} views</small>

                <Link className="continue-reading" to={`/blogs/${blog._id}`}>
                  Continue reading
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Home;
