import React, { Component } from "react";

import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  getUsers() {
    const db = this.props.firebase.db;
    db.settings({
      timestampsInSnapshots: true,
    });
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        this.setState({
          users: data,
          loading: false,
        });
      });
  }

  componentDidMount() {
    this.getUsers();
    this.setState({ loading: true });
    console.log(this.props.firebase);
  }

  componentWillUnmount() {
    // this.props.firebase.db.collection("users").onSnapshot();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        {loading && <div>Loading...</div>}

        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <table className="table">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Password</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr>
          <th scope="row">{user.username}</th>
          <td>{user.email}</td>
          <td>{user.password}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

// AVAILABLE FOR USERS WITH THE ADMIN ROLE
// const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

const condition = (authUser) => !!authUser;

export default withFirebase(withAuthorization(condition)(AdminPage));
// export default withFirebase(AdminPage);
