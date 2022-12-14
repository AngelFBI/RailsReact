import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ currentUser, onSignout, location, history }) => {
  const authLinks = currentUser && (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <a
          href="#"
          onClick={(event) => onSignout(event, location, history)}
          className="nav-link"
        >
          Sign Out
        </a>
      </li>
      <li className="nav-item mt-1">
        <p className="navbar-text"> Signed in as {currentUser.email}</p>
      </li>
    </ul>
  );

  const unAuthLinks = !currentUser && (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Sign In
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <Link className="navbar-brand goog" to="/">
        O-Sale
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {currentUser ? authLinks : unAuthLinks}
      </div>
    </nav>
  );
};

Header.propTypes = {
  currentUser: PropTypes.object,
  onSignout: PropTypes.func.isRequired,
};

export default (props) => (
  <Header {...props} location={useLocation()} history={useNavigate()} />
);
