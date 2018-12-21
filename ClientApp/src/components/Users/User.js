import React, { Component } from "react";
import {
  Button,
  Badge,
  FormGroup,
  InputGroup,
  FormControl
} from "react-bootstrap";
import ModalUserEdit from "./ModalUserEdit";

export default class User extends Component {
  displayName = User.name;

  constructor(props, context) {
    super(props, context);

    this.state = {
      users: null,
      roles: null,
      role: null,
      userRoles: null,
      showModal: false,
      action: "",
      actions: ["add", "update"],
      searchText: "",
      credentials: null
    };
  }

  componentDidMount = () => {
    fetch("api/Role/GetRoles")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ roles: data.roles });
      });
    this.updateView();
  };

  updateView = () => {
    fetch("api/User/GetUsers")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ users: data.users });
      });

    fetch("api/User/GetUserRoles")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ userRoles: data.userRoles });
      });
  };

  render = () => {
    let contents =
      this.state.roles && this.state.users && this.state.userRoles ? (
        this.renderUsersTable(
          this.state.users,
          this.state.roles,
          this.state.userRoles
        )
      ) : (
        <div className="loader">Loading...</div>
      );
    let badge = this.state.users ? (
      <Badge>{this.state.users.length}</Badge>
    ) : (
      <div />
    );
    return (
      <div>
        <h1>Users of YW-M Stock system {badge}</h1>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              onChange={event =>
                this.setState({ searchText: event.target.value })
              }
            />
            <InputGroup.Button>
              <Button onClick={this.handleSearch}>Search</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        <Button onClick={this.handleAdd}>Add new user</Button>
        {contents}
        {this.state.credentials && this.state.roles && (
          <ModalUserEdit
            show={this.state.showModal}
            roles={this.state.roles}
            userRoles={this.state.userRoles}
            action={this.state.action}
            actions={this.state.actions}
            close={this.handleClose}
            save={this.handleSave}
            credentials={this.state.credentials}
            user={this.state.user}
          />
        )}
      </div>
    );
  };

  renderUsersTable = users => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
            <th>Role</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              {this.setRole(user.id)}
              <td>
                <Button bsStyle="link" onClick={() => this.handleEdit(user.id)}>
                  Edit
                </Button>
                <Button
                  bsStyle="link"
                  onClick={() => this.handleDelete(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  setRole = userId => {
    const userRole = this.state.userRoles.find(ur => ur.userId === userId);
    const roleName = userRole ? this.state.roles.find(
      r => r.id === userRole.roleId
    ).name : ""
    return <td>{roleName}</td>;
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleSearch = () => {
    fetch("api/User/GetUsers")
      .then(response => response.json())
      .then(data => {
        this.setState({
          users: data.users.filter(
            rec =>
              rec.userName
                .toLowerCase()
                .includes(this.state.searchText.toLowerCase()) ||
              rec.email
                .toLowerCase()
                .includes(this.state.searchText.toLowerCase())
          )
        });
      });
  };

  handleAdd = () => {
    this.setState({
      showModal: true,
      action: this.state.actions[0],
      credentials: {
        user: { userName: "", email: "" },
        password: "",
        roleId: 0,
        oldRoleId: 0
      }
    });
  };

  handleDelete = id => {
    if (!window.confirm("Are you sure you wish to delete this item?")) return;
    fetch("api/User/Delete/" + id, { method: "delete" })
      .then(response => response.json())
      .then(data => {
        this.setState({ users: data.users });
      });
  };

  handleEdit = id => {
    const u = this.state.users.find(user => user.id === id);
    const userRole = this.state.userRoles.find(ur => ur.userId === id);
    const roleId = userRole ? this.state.roles.find(
      r => r.id === userRole.roleId
    ).id : null
    this.setState(
      {
        credentials: {
          user: u,
          password: "",
          roleId: roleId,
          oldRoleId: roleId
        },
        action: this.state.actions[1]
      },
      () => this.setState({ showModal: true })
    );
  };
}