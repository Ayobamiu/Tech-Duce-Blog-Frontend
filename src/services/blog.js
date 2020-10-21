import axios from "axios";
import { getToken } from "./user";

const userToken = getToken();

export function getBlogs() {
  return axios.get("http://localhost:3001/blogs");
}

export function getBlogById(id) {
  return axios.get(`http://localhost:3001/blogs/${id}`);
}
export function getBlogByIdForLoggedInUser(id) {
  return axios.get(`http://localhost:3001/blogs/${id}/logged-in-user`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export function addBlog(blog) {
  return axios.post("http://localhost:3001/blogs", blog, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export function addLike(blogId) {
  return axios.patch(`http://localhost:3001/blogs/${blogId}/addlike`, null, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export function removeLike(blogId) {
  return axios.patch(`http://localhost:3001/blogs/${blogId}/removelike`, null, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export function addComment(blogId, data) {
  return axios.post(`http://localhost:3001/comments/${blogId}`, data, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
