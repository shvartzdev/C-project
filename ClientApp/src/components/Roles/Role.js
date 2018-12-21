import React, { Component } from "react";
import {
  Button,
  Badge,
  FormGroup,
  InputGroup,
  FormControl
} from "react-bootstrap";


export default class Role extends Component {
  displayName = Role.name;

  constructor(props, context) {
    super(props, context);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

    this.state = {
      roles: null,
      roleName: ""
    };
  }

  componentDidMount = () => {
    fetch("api/Role/GetRoles")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ roles: data.roles });
      });
  };

  render = () => {
    let contents = this.state.roles ? (
      this.renderRolesTable(this.state.roles)
    ) : (
      <div >Loading...</div>
    );
    return <div>{contents}</div>;
  };

  handleDelete = id => {
    if (!window.confirm("Are you sure you wish to delete this item?")) return;
    fetch("api/Role/Delete/" + id, { method: "delete" })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ roles: data.roles });
      });
  };

  handleAdd = () => {
    fetch("api/Role/Create", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.roleName)})
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({ roles: data.roles });
        })
    };

  renderRolesTable = roles => {
    return (
      <div>
        <h1>Справочник ролей</h1>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              onChange={event =>
                this.setState({ roleName: event.target.value })
              }
            />
            <InputGroup.Button>
              <Button onClick={this.handleAdd}>Добавить роль</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>
                  <Button
                    bsStyle="link"
                    onClick={() => this.handleDelete(role.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
}