import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase/context";
import * as ROUTES from "../../constants/routes";

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);
const INITIAL_STATE = {
  email: "",
  error: null,
};
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = (event) => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;
    const isInvalid = email === "";
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Forgot password?</label>
          <input
            name="email"
            className="form-control"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Enter your email"
          />
        </div>
        <button
          className="btn btn-secondary"
          disabled={isInvalid}
          type="submit"
        >
          Reset My Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
const PasswordForgetLink = () => (
  <form>
    <div className="form-group">
      <small id="emailHelp" className="form-text text-muted">
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot your Password?</Link>
      </small>
    </div>
  </form>
);
export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };
