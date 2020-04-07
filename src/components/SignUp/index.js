import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignUpPage = () => {
  return (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );
};

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      (email === "") | (username === "");

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label for="exampleInputEmail1">Full Name</label>
          <input
            name="username"
            class="form-control"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Enter name"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            name="email"
            class="form-control"
            value={email}
            onChange={this.onChange}
            type="email"
            placeholder="Enter email"
          />
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Password</label>
          <input
            name="passwordOne"
            class="form-control"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Password</label>
          <input
            name="passwordTwo"
            class="form-control"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <button
          className="btn btn-secondary"
          disabled={isInvalid}
          type="submit"
        >
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <form>
    <div className="form-group">
      <small id="emailHelp" class="form-text text-muted">
        Don't have an account? {<Link to={ROUTES.SIGN_UP}>Sign Up</Link>}
      </small>
    </div>
  </form>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
