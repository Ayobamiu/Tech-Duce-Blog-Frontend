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
    loading: true,
  };
  async componentDidMount() {
    const id = this.props.match.params.id;
    const { data } = await getBlogById(id);
    const blog = data.blog;
    const likes = data.blog.likes;
    const comments = data.comments;
    if (getLoggedInUser()) {
      const { data: neww } = await getBlogByIdForLoggedInUser(id);
      this.setState({ blogForLoggedInUser: neww.blog, loading: false });
    }
    this.setState({ blog, comments, likes, loading: false });
  }
  handleLike = async (blog) => {
    if (!getLoggedInUser()) window.location = "/login";
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
    if (!getLoggedInUser()) {
      window.location = "/login";
    }
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
    let { blog, comments, likes, blogForLoggedInUser, loading } = this.state;
    if (getLoggedInUser()) {
      blog = blogForLoggedInUser;
    }
    return (
      <React.Fragment>
        {loading ? (
          <div class="loader"></div>
        ) : (
          <div className="blog-details-page">
            <div className="blog-details">
              <div className="blog">
                <div className="blog-head">
                  <h1>{blog.title} </h1>
                  <small>{blog.category}</small>
                </div>
                <small>
                  <Moment fromNow>{blog.createdAt}</Moment>
                </small>
                <p>{blog.body}</p>
                <small>{blog.views} views</small>
                <small>{blog.likes}</small>
                <i
                  className="fa fa-thumbs-up like-control"
                  id="like-control"
                  onClick={() => this.handleLike(blog)}
                  style={{ color: blog.isLiked ? "red" : "grey" }}
                ></i>
              </div>
              <div className="blog-details-author">
                <small>Author</small>
                <div className="blog-details-author-head">
                  {blog.owner && blog.owner.full_name}{" "}
                </div>
                <div className="blog-details-author-links">
                  <a
                    href={blog.owner && blog.owner.linkedIn_link}
                    className="fab fa-linkedin"
                    title="LinkedIn"
                  ></a>
                  <a
                    href={blog.owner && blog.owner.twitter_link}
                    className="fab fa-twitter"
                    title="Twitter"
                  ></a>
                  <a
                    href={blog.owner && blog.owner.facebook_link}
                    className="fab fa-facebook"
                    title="Facebook"
                  ></a>
                  <a
                    href={blog.owner && blog.owner.medium_link}
                    className="fab fa-medium"
                    title="Medium"
                  ></a>
                </div>
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
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Blog;
