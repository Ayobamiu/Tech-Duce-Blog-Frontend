import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getLoggedInUser } from "../services/user";

class Footer extends Component {
  state = {};
  seeMore = () => {
    const see_more = document.getElementById("footer-more");
    if (see_more.style.display === "block") {
      see_more.style.display = "none";
    } else {
      see_more.style.display = "block";
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="footer">
          <small>TechDuce Blog</small>
          {getLoggedInUser() && <Link to="/logout">Logout</Link>}
          <small onClick={this.seeMore}>See more</small>
        </div>
        <div className="footer-more" id="footer-more">
          {getLoggedInUser() && (
            <Link to="/delete-account" className="close-account">
              Close your TechDuce account
            </Link>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
