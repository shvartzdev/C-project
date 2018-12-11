import React, { Component } from 'react';
import AddUserModal from '../Users/AddUserModal';
import {
  Button, Table
  // Badge,
  // FormGroup,
  // InputGroup,
  // FormControl
} from "react-bootstrap";

//import './styles.css';

export default class Users extends Component {
  displayName = Users.name;

  constructor(props, context) {
    super(props, context);

    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      users: null,
      user: {
        Name: "",
        Surname: "",
        Email: "",
        RoleID: ""
      },
      showCreationModal: false
    };
  }

  componentDidMount = () => {
    fetch("api/user/getall", { dataType: 'json' })
      .then(response => response.json())
      .then(data => {
        this.setState({ users: data.users });
      });
  }


  handleUpdate = (userId) => {
    let userDTO = this.state.user;
    userDTO = { ...userDTO, userId: userId };
    fetch("api/user/edit/" + userId, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userDTO)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ users: data.users });
      })
  }

  handleDelete = (userId) => {
    console.log("id", userId);
    if (!window.confirm("Are you sure you want to delete the user?")) return;
    fetch("api/user/delete/" + userId, { method: "delete" })
      .then(responce => responce.json())
      .then(data => {
        console.log(data);
        this.setState({ users: data.users })
      })
  }

  renderUserTable = (user) => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <td>Surname</td>
            <th>E-mail</th>
            <th>RoleId</th>
            <th />
          </tr>
        </thead>
        <tbody>

          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.email}</td>
            <td>{user.RoleID}</td>
            <td>
              <Button bsStyle="link">
                Edit
                </Button>
              <Button 
                bsStyle="link"
                onClick={() => this.handleDelete(user.userID)}
              >
              {console.log("id ",user.userID)}
                Delete
                </Button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  render = () => {
    let cards = this.state.users ? (this.state.users.map(user => this.renderUserTable(user))) : <div>Loading...</div>;
    return (
      <div>
        <h1>Users</h1>
        <p>Here you can see your Users in this semester</p>
        {cards}
        <br />
        <AddUserModal
          show = {this.state.showCreationModal}
          user = {this.state.user}
        />
        
      </div>
    );
  }
}
