import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login";
import SignUp from "./components/signUp";
import "./font_awesome/css/all.css";
import "./font_awesome/css/all.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Home from "./components/homepage";
import Blog from "./components/blog";
import AddBlog from "./components/addBlog";
import Footer from "./components/footer";
import Logout from "./components/logout";
import DeleteAccount from "./components/deleteAccount";
import ResetPassword from "./components/resetPassword";
import StartReset from "./components/startReset";


function App() {
  return (
    <div>
      <NavBar />
      <ToastContainer />
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/start-reset" component={StartReset} />
        <Route path="/reset-password/:token" component={ResetPassword} />
        <Route path="/delete-account" component={DeleteAccount} />
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={Login} />
        <Route path="/blogs/add" component={AddBlog} />
        <Route path="/blogs/:id" component={Blog} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
