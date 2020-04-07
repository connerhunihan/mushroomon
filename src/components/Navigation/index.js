import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import { AuthUserContext } from "../Session";
import * as ROUTES from "../../constants/routes";

// Responsive behavior depends on our Collapse JavaScript plugin

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? (
          <NavigationAuth email={authUser.email} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ({ email }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to={ROUTES.HOME}>
      Mushroomon
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo02"
      aria-controls="navbarTogglerDemo02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to={ROUTES.LANDING}>
            Landing
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={ROUTES.ACCOUNT}>
            My Account
          </Link>
        </li>
        <li className="nav-item mr-3">
          <Link className="nav-link " to={ROUTES.ADMIN}>
            Admin
          </Link>
        </li>
      </ul>

      <ul className="navbar-nav">
        <li className="nav-item">
          <p className="nav-link">{email}</p>
        </li>
        <li className="nav-item">
          <SignOutButton />
        </li>
      </ul>
    </div>
  </nav>
);

const NavigationNonAuth = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to={ROUTES.HOME}>
      Mushroomon
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo02"
      aria-controls="navbarTogglerDemo02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to={ROUTES.LANDING}>
            Landing
          </Link>
        </li>
      </ul>

      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="btn btn-secondary btn-s" to={ROUTES.SIGN_IN}>
            Log in
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navigation;
