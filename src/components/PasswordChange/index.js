import React, { Component } from "react";
import { withFirebase } from "../Firebase";
const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null,
};
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = (event) => {
    const { passwordOne } = this.state;
    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";
    return (
      <form onSubmit={this.onSubmit}>
        <div class="form-group">
          <label htmlFor="exampleInputEmail1">New password</label>
          <input
            name="passwordOne"
            className="form-control"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Enter your new password"
          />
        </div>
        <div class="form-group">
          <label htmlFor="exampleInputEmail1">Confirm password</label>
          <input
            name="passwordTwo"
            className="form-control"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm your new password"
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
export default withFirebase(PasswordChangeForm);
