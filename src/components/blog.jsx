import React, { Component } from "react";
import {
  addComment,
  addLike,
  getBlogById,
  getBlogByIdForLoggedInUser,
} from "../services/blog";
import Moment from "react-moment";
import { removeLike } from "./../services/blog";
import { getLoggedInUser } from "./../services/user";
import { toast } from "react-toastify";

class Blog extends Component {
  state = {
    blog: {},
    blogForLoggedInUser: {},
    comments: [],
    likes: "",
    comment: "",
  };
  async componentDidMount() {
    const id = this.props.match.params.id;
    const { data } = await getBlogById(id);
    const blog = data.blog;
    const likes = data.blog.likes;
    const comments = data.comments;
    if (getLoggedInUser()) {
      const { data: neww } = await getBlogByIdForLoggedInUser(id);
      this.setState({ blogForLoggedInUser: neww.blog });
    }
    this.setState({ blog, comments, likes });
  }
  handleLike = async (blog) => {
    const id = this.props.match.params.id;
    const likeButton = document.getElementById("like-control");
    if (likeButton.style.color === "grey") {
      likeButton.style.color = "red";
      await addLike(id);
      window.location.reload();
    } else {
      likeButton.style.color = "grey";
      await removeLike(id);
      window.location.reload();
    }
  };
  handleChange = (e) => {
    e.preventDefault();
    const comment = e.target.value;
    this.setState({
      comment,
    });
  };
  createComment = async (event, blog) => {
    const user = getLoggedInUser();
    event.preventDefault();
    const data = {
      message: this.state.comment,
      owner: user._id,
      blog: blog._id,
    };
    try {
      await addComment(blog._id, data);
      window.location.reload();
    } catch (error) {
      toast(error.response.data);
    }
  };
  render() {
    let { blog, comments, likes, blogForLoggedInUser } = this.state;
    if (getLoggedInUser) {
      blog = blogForLoggedInUser;
    }
    return (
      <React.Fragment>
        <div className="blog-details">
          <div className="blog">
            <small>{blog.category}</small>
            <h1>{blog.title} </h1>
            <small>
              <Moment format="YYYY/MM/DD">{blog.createdAt}</Moment>
            </small>
            <p>{blog.body}</p>
            <small>{blog.views}</small>
            <i className="fa fa-eye"></i>
            <small>{blog.likes}</small>
            <i
              className="fa fa-thumbs-up like-control"
              id="like-control"
              onClick={() => this.handleLike(blog)}
              style={{ color: blog.isLiked ? "red" : "grey" }}
            ></i>
          </div>
        </div>
        <div className="blog-comments">
          <h2>comments</h2>
          <div className="add-comment">
            <form onSubmit={(event) => this.createComment(event, blog)}>
              <textarea
                type="text"
                name="message"
                id="message"
                placeholder="Write your comment"
                onChange={this.handleChange}
              />
              <input type="submit" value="Comment" />
            </form>
          </div>
          {comments.map((comment) => (
            <div key={comment._id} className="comment">
              <small>{comment.owner.full_name}</small>
              <p>{comment.message}</p>
              <small>
                <Moment fromNow>{comment.createdAt}</Moment>
              </small>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Blog;
