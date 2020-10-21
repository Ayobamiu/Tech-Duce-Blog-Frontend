import axios from "axios";
import { getToken } from "./user";
 
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

const userToken = getToken();

export function getBlogs() {
  return axios.get(`${REACT_APP_BASE_URL}/blogs`);
}

export function getBlogById(id) {
  return axios.get(`${REACT_APP_BASE_URL}/blogs/${id}`);
}
export function getBlogByIdForLoggedInUser(id) {
  return axios.get(`${REACT_APP_BASE_URL}/blogs/${id}/logged-in-user`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export function addBlog(blog) {
  return axios.post(`${REACT_APP_BASE_URL}/blogs`, blog, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export function addLike(blogId) {
  return axios.patch(`${REACT_APP_BASE_URL}/blogs/${blogId}/addlike`, null, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export function removeLike(blogId) {
  return axios.patch(`${REACT_APP_BASE_URL}/blogs/${blogId}/removelike`, null, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export function addComment(blogId, data) {
  return axios.post(`${REACT_APP_BASE_URL}/comments/${blogId}`, data, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
