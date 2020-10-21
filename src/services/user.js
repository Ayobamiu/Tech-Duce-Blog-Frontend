import jwtDecode from "jwt-decode";
import axios from "axios";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export function registerUser(user) {
  return axios.post(`${REACT_APP_BASE_URL}/users`, user);
}

export function loginInWithToken(token) {
  localStorage.setItem("token", token);
}

export function loginUser(data) {
  return axios.post(`${REACT_APP_BASE_URL}/users/login`, data);
}

export function logoutUser() {
  localStorage.removeItem("token");
}

export function getLoggedInUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getToken() {
  return localStorage.getItem("token");
}

export function deleteUser(user) {
  return axios.delete(`${REACT_APP_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}
